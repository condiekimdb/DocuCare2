exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "DocuCare";
  var collName = "medicalQA";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  var documents;
  try {
    // Get a value from the context (see "Values" tab)
    // Update this to reflect your value's name.
    //var valueName = "value_name";
    //var value = context.values.get(valueName);

    // Execute a FindOne in MongoDB 
    medical = await collection.findOne({instructionVector: {$exists: false}});
  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);
    return { error: err.message };
  }
  
  //var result=[];
 // for (let i=0; i < documents.length; i++){
    //var vector = context.functions.execute("createEmbeddingAzure", documents[i].instruction, "slackbot-text-embedding-ada-002")
    //result.push(vector)
  //}
  const vector = await context.functions.execute("createEmbeddingAzure", medical.instruction, "slackbot-text-embedding-ada-002");

  return collection.updateOne({_id: medical._id}, {$set: {"instructionVector": vector}})
  .then(result => {
    const { matchedCount, modifiedCount } = result;
    if(matchedCount && modifiedCount) {
      console.log(`Successfully updated the item.`)
    }
  })
  .catch(err => console.error(`Failed to update the item: ${err}`));
//  return medical
};