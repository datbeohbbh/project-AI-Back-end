# project-AI-Back-end

### Run project
- ``npm start``

### Host
- **Host** ``localhost:8000``

### Endpoints

**Upload an image**

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
                "angry": 13.421,
                "disgust": 0.76376,
                "fear": 11.541,
                "happy": 30.056,
                "sad": 14.36,
                "surprise": 3.7882,
                "neutral": 26.07
            }
        },
        "1": {
            "emotion": {
                "angry": 11.311,
                "disgust": 1.2371,
                "fear": 19.577,
                "happy": 15.466,
                "sad": 25.96,
                "surprise": 6.2799,
                "neutral": 20.17
            }
        },
        "2": {
            "emotion": {
                "angry": 14.66,
                "disgust": 1.057,
                "fear": 13.679,
                "happy": 24.062,
                "sad": 17.104,
                "surprise": 4.8249,
                "neutral": 24.612
            }
        }
    },
    "image_display": "localhost:8000/images/detected/image-1633677666773-834733804.jpg"
}
```

**Get all images**
- **GET** ``/images/all/uploaded``
- **Response**
```text
Status: 200 OK
```

**Get an image with name**
- **GET** ``/images/uploaded/{image_name}``
- **Response** 
```text
Status: 200 OK
```

**Get all detected faces**
- **GET** ``/images/all/detected``
- **Response**
```text
Status: 200 OK
```

**Get a detected face with name**
- **GET** ``/images/detected/{image_name}``
- **Response** 
```text
Status: 200 OK
```

**Download detected image**
- **GET** ``/images/detected/{image_name}/download``
- **Response**
```text
TODO
```
