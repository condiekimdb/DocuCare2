exports = async function(request,response){
  
  if (request.body === undefined) {
    throw new Error(`Request body was not defined.`);
  }
  const body = JSON.parse(request.body.text());
  console.log(body);
  var serviceName = "mongodb-atlas";
  var dbName = "SampleData";
  var collName = "mergedPatientData";
  
  const agg = [
  {
    '$search': {
      'index': 'patient_autocomplete', 
      'compound': {
        'should': [
          {
            'autocomplete': {
              'query': body.text, 
              'path': 'first', 
              'fuzzy': {
                'maxEdits': 2, 
                'prefixLength': 1, 
                'maxExpansions': 256
              }
            }
          }, {
            'autocomplete': {
              'query': body.text, 
              'path': 'last', 
              'fuzzy': {
                'maxEdits': 2, 
                'prefixLength': 1, 
                'maxExpansions': 256
              }
            }
          }
        ]
      }, 
      'highlight': {
        'path': [
          'first', 'last'
        ]
      }
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      'first': 1, 
      'last': 1, 
      'patient': 1, 
      'highlights': {
        '$meta': 'searchHighlights'
      }
    }
  }
]

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
    results = await collection.aggregate(agg).toArray()
    return {message: results}
};