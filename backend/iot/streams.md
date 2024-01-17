```
let pipeline = [
 {$source: {"connectionName": "edge_kafka", "topic": "telemetry-data-health"}},
  {
        '$set': {
            'ts_data': '$$ROOT'
        }
    },

 {
  "$lookup": {
    "from": {
      "connectionName": "docucare_db",
      "db": "SampleData",
      "coll": "mergedPatientData"
    },
    "localField": "metadata.sensorId",
    "foreignField": "patient",
    "as": "result"
  }
},{
        '$lookup': {
            'from': 'mergedPatientData', 
            'localField': 'metadata.sensorId', 
            'foreignField': 'patient', 
            'as': 'result'
        }
    }, {
        '$match': {
            'result': {
                '$not': {
                    '$size': 0
                }
            }
        }
    }, {
        '$set': {
            'result': {
                '$arrayElemAt': [
                    '$result', 0
                ]
            }
        }
    }, {
        '$set': {
            'result.tsdata': '$ts_data'
        }
    }, {
        '$replaceRoot': {
            'newRoot': '$result'
        }
    },
 {
   $merge: {
      into: {
         connectionName: "docucare_db",
         db: "SampleData",
         coll: "mergedPatientData"
      }
   }
}
]
```




```
[
    {
        '$set': {
            'ts_data': '$$ROOT'
        }
    }, {
        '$lookup': {
            'from': 'mergedPatientData', 
            'localField': 'metadata.sensorId', 
            'foreignField': 'patient', 
            'as': 'result'
        }
    }, {
        '$match': {
            'result': {
                '$not': {
                    '$size': 0
                }
            }
        }
    }, {
        '$set': {
            'result': {
                '$arrayElemAt': [
                    '$result', 0
                ]
            }
        }
    }, {
        '$set': {
            'result.tsdata': '$ts_data'
        }
    }, {
        '$replaceRoot': {
            'newRoot': '$result'
        }
    }
]
```

sp.createStreamProcessor("enrichPatient", pipeline)