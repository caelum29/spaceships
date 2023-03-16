
## Description

API that will serve calculated suitable spaceship configurations based on the various requirements.



## Running the app

```bash
# start and run a database
$ npm run start:docker

# development
$ npm run start

# watch mode
$ npm run start:dev

```

## implemented endpoints

```bash
# getVesselsConfig
$ GET http://localhost:3000/api/getVesselConfigs?max_price=2000&max_weight=200&journey_distance=10

# create scanner
$ POST http://localhost:3000/scanner

body:
  {
    "name": "SEE-1",
    "vendor": "Kreoger",
    "type": "Scout",
    "weight": 10,
    "price": 25
  }

# get scanners
$ GET http://localhost:3000/scanner

# get scanner by id
$ GET http://localhost:3000/scanner/:id

# update scanner
$ PATCH http://localhost:3000/scanner/:id 

body:
  {
    "name": "SEE-1",
    "vendor": "Kreoger",
    "type": "Scout",
    "weight": 10,
    "price": 25
  }
    
# delete scanner
$ DELETE http://localhost:3000/scanner/:id
```

## Comments

```bash
I suppose that exist fancy way to retrieve all needed data 
  from database in one aggregation query, but I didn't find it.
```
