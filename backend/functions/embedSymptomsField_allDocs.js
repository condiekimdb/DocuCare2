exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "DocuCare";
  var collName = "medical";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  const medical = await collection.find({instructionVector: {$exists: false}}, {}).toArray();
  
    for (let i=0; i < 10; i++){
    const vector = await context.functions.execute("createEmbeddingAzure", medical[i].instruction, "slackbot-text-embedding-ada-002")
    collection.updateOne({_id: medical[i]._id}, {$set: {"instructionVector": vector}})
  }
};