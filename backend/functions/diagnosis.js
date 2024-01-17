exports = async function (request,response) {
  const docs_collection = context.services
    .get("mongodb-atlas")
    .db("DocuCare")
    .collection("medicalQA");
    
  var body = JSON.parse(request.body.text());
  const embedding = await context.functions.execute("createEmbeddingAzure", body.text, "slackbot-text-embedding-ada-002");

  const results = await docs_collection.aggregate([
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "symptomVector",
        "queryVector": embedding,
         "numCandidates": 100,
         "limit": 5
        },
      },
    { $project: { symptomVector: 0 } },
  ]).toArray();
  
  
   // 2. Generate a blob of text
  const relatedInputs = results
    .map((input) => {
      return input.content;
    })
    .join("\n\n");
    
    const finalmessage = relatedInputs + "patience comments: " + body.text;
  
   const finalresponse = await context.functions.execute("callOpenAI", {
    message:finalmessage
  });

  return finalresponse;
    
};