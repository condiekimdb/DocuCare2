import { Configuration, OpenAIApi } from "azure-openai";

exports = async function (request,response) {
  const docs_collection = context.services
    .get("mongodb-atlas")
    .db("DocuCare")
    .collection("medical");
    
  var body = JSON.parse(request.body.text());
  //const embedding = await context.functions.execute("createEmbeddingAzure", body.text, "slackbot-text-embedding-ada-002");
  //console.log(embedding)

  // const results = await docs_collection.aggregate([
  //   {
  //     '$vectorSearch': {
  //       'queryVector': embedding, 
  //       'path': 'symptomVector', 
  //       'numCandidates': 2000,
  //       'index': 'vec_idx_medical', 
  //       'limit': 5
  //     }
  //   }, {
  //     '$project': {
  //       'symptom': 1, 
  //       'diagnosis': 1, 
  //       '_id': 0
  //     }
  //   }
  // ]).toArray();
  
  
  //call openai
    const configuration = new Configuration({
    azure: {
        apiKey: "8a75a058873b4f249bbf173ba6ca225b",
        endpoint: "https://slackbot-resource.openai.azure.com/",
        deploymentName: "slackbot-gpt-35-turbo", 
      }
  });
  
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      messages: [
            {
            "role": "system",
            "content": `I am a medical professional looking to conduct further patient discovery to uncover 
                their potential issue, help me come up with maximum 4 key words to use NOT included in for further diagnoses. 
                The key words should be 2-5 words each. Avoid mentioning any diagnosis. 
                ONLY return a comma separated list with no formatting`,
            },
            {
            "role": "user",
            "content": body.text
            }
        ]
    });
    return { message: completion.data.choices[0].message.content }
    
};