# project-AI-Back-end

### Run project: 
- ``npm start``

### Endpoints:
\
**Upload an image:**

- **POST**  ``/uploads``

- **Response**
```json
{
    "msg": "Upload successfully!!",
    "image_name": "image-1634739518634-445512493.png"
}
```


**Get emotion**

- **GET** ``/emotions/{image_name}``

- **Response**
```json
{
    "emotions_from_image": {
        "0": {
            "emotion": {
                "angry": 14.878,
                "disgust": 2.8379,
                "fear": 19.677,
                "happy": 21.754,
                "sad": 14.177,
                "surprise": 12.584,
                "neutral": 14.093
            }
        }
    },
    "image_display": "localhost:8000/images/detected/image-1633454111387-151761211.jpg"
}
```

**Get images**
- **GET** ``/images/all/uploaded``
- **Response**
```text
Status: 200 OK
```

- **GET** ``/images/uploaded/{image_name}``
- **Response** 
```text
Status: 200 OK
```

- **GET** ``/images/all/detected``
- **Response**
```text
Status: 200 OK
```

- **GET** ``/images/detected/{image_name}``
- **Response** 
```text
Status: 200 OK
```

- **GET** ``/images/detected/{image_name}/download``
- **Response**
```text
TODO
```
