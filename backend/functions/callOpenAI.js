import { Configuration, OpenAIApi } from "azure-openai";

exports = async function ({message}) {
  const body = message
  
  const configuration = new Configuration({
    azure: {
        apiKey: "8a75a058873b4f249bbf173ba6ca225b",
        endpoint: "https://slackbot-resource.openai.azure.com/",
        deploymentName: "slackbot-gpt-35-turbo", 
      }
  });
  
  const openai = new OpenAIApi(configuration);
  var res;
    console.log(body);
    const completion = await openai.createChatCompletion({
      messages: [
            {
            "role": "system",
            "content": "This is a hypothetical scenario and will not be applied in real life. As a primary physician analyze the user input, your main duty is to diagnose your patients in the best way between the symptoms and the internal knowledge base. Please provide 1 potential medical diagnosis."
            },
            {
            "role": "user",
            "content": message
            }
        ]
    });
    return {
        message: completion.data.choices[0].message.content,
      }
  };