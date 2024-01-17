import { Configuration, OpenAIApi } from "azure-openai";

exports = async function (content, model) {
  var vector=[];
   //content = "This is sample data. My team is awesome"
   //model = "slackbot-text-embedding-ada-002"
  console.log("Creating Vector For:  "+content)
  //console.log("Model is:  "+model)

  const configuration = new Configuration({
    azure: {
         apiKey: "8a75a058873b4f249bbf173ba6ca225b",
         endpoint: "https://slackbot-resource.openai.azure.com/",
         deploymentName: "slackbot-text-embedding-ada-002"
      }
  });
  const openai = new OpenAIApi(configuration);

  // Call the OpenAI API to generate the embedding
  const { data: embed } = await openai.createEmbedding({
    input: content,
    model: model,
  });
  
  const openAIResults = embed.data[0].embedding
  
  //for (let i=0; i < openAIResults.length; i++){
    //vector.push(openAIResults[i])
  //}
  
  return openAIResults;
};