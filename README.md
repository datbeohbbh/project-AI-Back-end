# project-AI-Back-end

### Dependencies
- ``face-api.js``
- ``@tensorflow/tfjs-core@1.7.0``
- ``@tensorflow/tfjs-node@1.7.0``

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
   "emotions":[
      {
         "neutral":0.11183624714612961,
         "happy":0.5560763478279114,
         "sad":0.3034437298774719,
         "angry":0.017230942845344543,
         "fearful":0.000020465313355089165,
         "disgusted":0.010705217719078064,
         "surprised":0.000687058549374342
      },
      {
         "neutral":3.300251023574674e-7,
         "happy":0.9993497729301453,
         "sad":0.000649243884254247,
         "angry":1.1409615474633483e-9,
         "fearful":6.282812377994551e-12,
         "disgusted":6.022410730111005e-7,
         "surprised":7.533708767937242e-9
      },
      {
         "neutral":0.00000896220990398433,
         "happy":0.9997883439064026,
         "sad":0.00014315159933175892,
         "angry":0.000055929423979250714,
         "fearful":1.4776727397247669e-8,
         "disgusted":1.3889085437313042e-7,
         "surprised":0.000003424743226787541
      },
      {
         "neutral":0.0000055945265557966195,
         "happy":0.9999938011169434,
         "sad":7.845342153700585e-9,
         "angry":1.0012250584168214e-7,
         "fearful":5.452938881683744e-12,
         "disgusted":1.6134067692963328e-10,
         "surprised":5.097662096886779e-7
      }
   ],
   "image_display":"localhost:8000/images/detected/image-1633677579710-387173672.jpg"
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
