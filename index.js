const { MongoClient } = require('mongodb');
const assert = require('assert');
const { v4 } = require('uuid');

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/mongodb-deep-set';

async function main() {
  const db = await MongoClient.connect(MONGO_URL);

  collection = db.collection('mongodb-deep-set');

  await collection.deleteMany({});

  const docs = [
    {
      subDocuments: [
        {
          id: v4(),
          name: 'hello',
        },
        {
          id: v4(),
          name: 'hello2',
        },
      ],
    },
  ];

  const { result, ops, insertedIds } = await collection.insert(docs);

  assert.equal(docs.length, result.n);
  assert.equal(docs.length, ops.length);

  const inserted = await collection
    .find({ _id: { $in: insertedIds } })
    .toArray();

  assert.equal(docs.length, inserted.length);

  console.log('Docs before update:', JSON.stringify(inserted, null, 4));

  for (const doc of inserted) {
    // not possible to update multi sub docs at once - https://stackoverflow.com/a/10700227
    // -> iterator needed 😷
    const deepSubDocs = [
      {
        id: v4(),
        type: 'hey',
      },
    ];
    for (const subDocument of doc.subDocuments) {
      await collection.update(
        {
          _id: doc._id,
          'subDocuments.id': subDocument.id,
        },
        {
          $set: {
            'subDocuments.$.deepSubDocs': deepSubDocs,
          },
        }
      );
    }
  }

  const afterUpdate = await collection
    .find({ _id: { $in: insertedIds } })
    .toArray();
  console.log('Docs after update:', JSON.stringify(afterUpdate, null, 4));
}

main()
  .then(() => {
    process.exit();
  })
  .catch(err => {
    console.error('failed:', err);
    process.exit(1);
  });
