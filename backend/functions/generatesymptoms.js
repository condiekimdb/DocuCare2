import { Configuration, OpenAIApi } from "azure-openai";
// import { Configuration, OpenAIApi } from "openai";

// exports = async function ({query}) {
exports = async function (request, response) {
  // console.log(JSON.stringify(request.body))
  const body = JSON.parse(request.body.text());
  
  const configuration = new Configuration({
    azure: {
        apiKey: "8a75a058873b4f249bbf173ba6ca225b",
        endpoint: "https://slackbot-resource.openai.azure.com/",
        // deploymentName is optional, if you donot set it, you need to set it in the request parameter
        deploymentName: "slackbot-gpt-35-turbo", // GPT-4
      }
  });
  
  const openai = new OpenAIApi(configuration);
  var res;
  try {
    // const { input } = body;
    console.log(body.message);
    const completion = await openai.createChatCompletion({
      //messages: messages,
      messages: [
            {
            "role": "system",
            "content": "Create a comma seperated list of symptoms from the following text. The keywords must be in medical terms. Do not provide descriptions of the chosen symptoms. Only provide the list of the symptoms separated by commas. If doctor note says 102 and above temperature give  high fever"
            },
            {
            "role": "user",
            "content": body.message
            }
        ]
      // model: "gpt-3.5-turbo" // Only needed for OpenAI, not Azure
    });
    response.setStatusCode(201);
    response.setBody(
      JSON.stringify({
        // insertedId,
        message: completion.data.choices[0].message.content,
      })
    );
    // return completion.data.choices[0].message.content;
    //return {response, usage: completion.data.usage}
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
    if (error.response) {
      console.log(error.response.status);
      console.log(JSON.stringify(error.response.data));
    } else {
      console.log(error.message);
      // throw error.message
    }
  }
};