exports = async function(request,response){
  
  if (request.body === undefined) {
    throw new Error(`Request body was not defined.`);
  }
  const body = JSON.parse(request.body.text());
  console.log(body);
  var serviceName = "mongodb-atlas";
  var dbName = "SampleData";
  var collName = "mergedPatientData";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
    return await collection.find(body)
};