Output

```sh
✗ npm start

> node index

Docs before update: [
    {
        "_id": "5a26846fa4959814f1c484c8",
        "subDocuments": [
            {
                "id": "8bac11b2-993a-4e90-9139-f3015f8549a4",
                "name": "hello"
            },
            {
                "id": "db944542-100b-485d-84d4-b03f43e52644",
                "name": "hello2"
            }
        ]
    }
]
Docs after update: [
    {
        "_id": "5a26846fa4959814f1c484c8",
        "subDocuments": [
            {
                "id": "8bac11b2-993a-4e90-9139-f3015f8549a4",
                "name": "hello",
                "deepSubDocs": [
                    {
                        "id": "e5b6bfbd-5648-4c3d-99a1-6b34ff3b9f8a",
                        "type": "hey"
                    }
                ]
            },
            {
                "id": "db944542-100b-485d-84d4-b03f43e52644",
                "name": "hello2",
                "deepSubDocs": [
                    {
                        "id": "e5b6bfbd-5648-4c3d-99a1-6b34ff3b9f8a",
                        "type": "hey"
                    }
                ]
            }
        ]
    }
]
```
