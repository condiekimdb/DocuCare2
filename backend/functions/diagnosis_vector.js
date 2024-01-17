exports = async function (request,response) {
  const docs_collection = context.services
    .get("mongodb-atlas")
    .db("DocuCare")
    .collection("medical");
    
  var body = JSON.parse(request.body.text());
  const embedding = await context.functions.execute("createEmbeddingAzure", body.text, "slackbot-text-embedding-ada-002");

  const results = await docs_collection.aggregate([
  {
    '$vectorSearch': {
      'queryVector': embedding, 
      'path': 'symptomVector', 
      'numCandidates': 2000, 
      'index': 'vec_idx_medical', 
      'limit': 1
    }
  }, {
    '$project': {
      'diagnosis': 1, 
      'treatment': 1, 
      '_id': 0
    }
  }
]).toArray();
  
    
  const finalmessage = "i have a patient with the symptoms: " + body.text +  " and a potential diagnosis from my internal knowledge base: " + JSON.stringify({ results });
  
   const finalresponse = await context.functions.execute("callOpenAI", {
    message:finalmessage
  });

  return finalresponse;
    
};