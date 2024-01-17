import { Configuration, OpenAIApi } from "azure-openai";

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

    const agg = [
      {
        '$match': {
          'patient': body.patient
        }
      }, {
        '$project': {
          'first': 1, 
          'gender': 1, 
          'race': 1, 
          'birthdate': 1, 
          'birthdateiso': {
            '$dateFromString': {
              'dateString': '$birthdate', 
              'timezone': 'America/New_York'
            }
          }, 
          'now': new Date(), 
          'conditions': '$conditions.DESCRIPTION', 
          'medicationsReasonDescription': '$medications.REASONDESCRIPTION', 
          'mostRecentEncounterReasonDescription': {
            '$arrayElemAt': [
              '$encounters.REASONDESCRIPTION', -1
            ]
          }
        }
      }, {
        '$project': {
          'first': 1, 
          'gender': 1, 
          'race': 1, 
          'age': {
            '$subtract': [
              {
                '$year': '$now'
              }, {
                '$year': '$birthdateiso'
              }
            ]
          }, 
          'conditions': 1, 
          'medicationsReasonDescription': 1, 
          'mostRecentEncounterReasonDescription': 1
        }
      }
    ];

    results = await collection.aggregate(agg).toArray();
    //const results = await context.functions.execute("patient_summary", JSON.stringify({ results }));
    // console.log(JSON.stringify({ message: results }))
    
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
            "content": "Give me a summary about a patient. Summarize the json input provided by the user to give a doctor a quick overview of this patient. Understand the data including patient first name (\"first\"), age (\"age\"), race (\"race\"), gender (\"gender\") diagnoses (\"conditions\"), medications (\"medicationsReasonDescription\"), and the reason for their last visit (\"mostRecentEncounterReasonDescription\"). Give me a short 1 paragraph summary about this patient. Begin the summary with the patient's first name"
            },
            {
            "role": "user",
            "content": JSON.stringify({ results })
            }
        ]
    });
    return { summary: completion.data.choices[0].message.content }
};