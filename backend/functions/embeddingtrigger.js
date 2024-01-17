
exports = async function(changeEvent) {
  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;
  const {prompt} = changeEvent.fullDocument // {prompt: "text", food: "hotdog"}
  // {instructionVectors: {$exists: false}}

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "DocuCare";
  const collection = context.services.get(serviceName).db(databaseName).collection(changeEvent.ns.coll);
  
  const embeddings = await context.functions.execute("embedSymptomsField", {content: prompt})
  
  return await collection.updateOne({_id: docId}, {$set: {embeddings}});
};