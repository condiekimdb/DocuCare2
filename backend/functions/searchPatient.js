exports = async function(request){
  
  console.log("test3");
  
  if (request.body === undefined) {
    throw new Error(`Request body was not defined.`);
  }

  const body = JSON.parse(request.body.text());
  console.log(body);

  console.log("test1");

  if (typeof body.query !== 'string') {
    throw new Error(`Query string is not defined in the request body.`);
  }
  
  console.log("test");
  console.log(body.query);

  const serviceName = "mongodb-atlas";
  const dbName = "SampleData";
  const collName = "mergedPatientData";

  const collection = context.services.get(serviceName).db(dbName).collection(collName);
return await collection.aggregate([
    {
      $search: {
        index: 'patientNames',
        compound: {
          should: [
            {
              wildcard: {
                path: '*',
                query: body.query + '*',
                allowAnalyzedField: true
              }
            }
          ]
        }
      }
    },
    {
      $limit: 10 // Limit the number of results returned
    }
  ]).toArray();
  
};
