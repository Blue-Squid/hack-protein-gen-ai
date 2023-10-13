// const {EndpointServiceClient} = require('@google-cloud/aiplatform');
export default {
  async runModel(parameters) {
    const { sendRequest, processResponse } = require("../helpers/google-foundation-models");
    const params = {
      apiEndpoint: "YOUR_API_ENDPOINT",
      projectId: "YOUR_PROJECT_ID",
      modelId: "text-bison@001",
      instances: [{ content: "When did the fetch API become natively supported in Node.JS?" }],
      // parameters: { temperature: 0.2, maxOutputTokens: 256, topP: 0.8, topK: 40 },
      parameters: parameters,
    };
    sendRequest(params)
      .then((response) => {
        console.log(response);
        processResponse(params, response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  // async listEndpoints() {
  //   const {EndpointServiceClient} = require('@google-cloud/aiplatform');
  //   const parent = `projects/${projectId}/locations/${location}`;
  //   const request = {
  //     parent,
  //   };

  //   // Get and print out a list of all the endpoints for this resource
  //   const [result] = await client.listEndpoints(request);
  //   for (const endpoint of result) {
  //     console.log(`\nEndpoint name: ${endpoint.name}`);
  //     console.log(`Display name: ${endpoint.displayName}`);
  //     if (endpoint.deployedModels[0]) {
  //       console.log(
  //         `First deployed model: ${endpoint.deployedModels[0].model}`
  //       );
  //     }
  //   }
  // }
}

