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
         "neutral":0.06942343711853027,
         "happy":0.00013201696856413037,
         "sad":1.1343513683925721e-8,
         "angry":0.0007792370743118227,
         "fearful":0.000010621349247230683,
         "disgusted":0.000008715945114090573,
         "surprised":0.9296459555625916
      },
      {
         "neutral":0.585228681564331,
         "happy":0.0002164007310057059,
         "sad":0.05682980269193649,
         "angry":0.036208443343639374,
         "fearful":0.03086921200156212,
         "disgusted":0.007916278205811977,
         "surprised":0.28273123502731323
      },
      {
         "neutral":0.11865148693323135,
         "happy":0.0000011145817779834033,
         "sad":0.000017805932657211088,
         "angry":0.8762515783309937,
         "fearful":3.2691843898646766e-8,
         "disgusted":0.0013845021603628993,
         "surprised":0.0036935515236109495
      },
      {
         "neutral":0.0002861876564566046,
         "happy":0.4653598368167877,
         "sad":0.5265687108039856,
         "angry":0.005695400759577751,
         "fearful":0.00046712812036275864,
         "disgusted":0.0015477304114028811,
         "surprised":0.00007495764293707907
      },
      {
         "neutral":0.0022109064739197493,
         "happy":1.0088746504877122e-9,
         "sad":0.9904816746711731,
         "angry":0.007289096247404814,
         "fearful":6.70477433573069e-8,
         "disgusted":0.000006767485956515884,
         "surprised":0.00001139876894740155
      },
      {
         "neutral":6.077020553441059e-10,
         "happy":1,
         "sad":7.956400122077767e-11,
         "angry":2.0147236656775647e-10,
         "fearful":8.613796525017148e-13,
         "disgusted":1.0119297622068757e-9,
         "surprised":8.52199699696854e-11
      }
   ],
   "image_name":"image-1636299616210-839518449.png"
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
- **POST** ``/images/detected/download/{image_name}``
- **Response**
```text
Status: 200 OK
```
