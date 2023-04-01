<!-- src/components/SubmitInput.vue -->

<template>
  <form class="w-full max-w-sm" @submit.prevent="submitInput">
    <div class="flex flex-wrap mb-6">
      <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
      <input id="title" v-model="inputValue" class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Enter title" required>
    </div>
    <div class="flex flex-wrap mb-6">
      <label for="apiKey" class="block text-gray-700 font-bold mb-2">apiKey</label>
      <input id="apiKey" v-model="apiKey" class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline" type="password" placeholder="Enter token" required>
    </div>
    <div class="flex flex-wrap mb-6">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
    </div>
  </form>
</template>



<script>
import axios from 'axios';
import auth from '@/services/auth';
const { Configuration, OpenAIApi } = require("openai");

const API_URL = 'https://api.stage.datacite.org';
const FABRICA_URL = 'https://doi.stage.datacite.org';

export default {
  data() {
    return {
      inputValue: '',
      apiKey: "",
      suffix: this.generatesuffix
    };
  },
  methods: {
    async submitInput() {
      try {
        this.completion(this.inputValue)
          .then(gptResponse => {
            // wait 5 seconds
            console.log('GPT response:', gptResponse);
            const response = axios.post(`${API_URL}/dois`, {
              data: this.payload(btoa(gptResponse)),
            }, {
              headers: auth.getAuthHeader(),
            })
            // }).then(response => this.gotoFabrica(response));
            console.log('Submission successful:', response.data);
            this.inputValue = '';
          })
        // const processedText = gptResponse.data.processedText;
        // console.log('GPT response:', auth.getAuthHeader());
        // const response = await axios.post(`${API_URL}/dois`, {
        //   data: this.payload(btoa(gptResponse)),
        // }, {
        //   headers: auth.getAuthHeader(),
        // })
        // }).then(response => this.gotoFabrica(response));

        // console.log('Submission successful:', response.data);
        this.inputValue = '';
      } catch (error) {
        console.error('Submission failed:', error.message);
      }
    },
    payload(xml) {
      return {
          type: 'dois',
          attributes: {
            xml: xml,
            prefix: '10.80225',
            source: 'fabricaGPT',
            state: "draft",
          },
      };
    },
    gotoFabrica(response) {
      if (response.status === 201) {
        window.location.href = `${FABRICA_URL}/dois/${encodeURIComponent(response.data.data.id)}/edit`;
      }
    },
    async completion (inputValue) {
        try {
        // Process the inputValue using OpenAI
          const configuration = new Configuration({
            apiKey: this.apiKey,
          });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Generate the DataCite XML metadata for a dataset with the title: ${inputValue}. The resource is CC-BY license.`,
            max_tokens: 700,
            temperature: 1,
          });

          const processedText = response.choices[0].text.trim();
          console.log(processedText);
          processedText
          // res.status(200).json({ processedText });
          // generate a xml file in  string
          // inputValue.trim() 

          // "<?xml versiofsdfdsfdssdfdfsresource>".trim()
        } catch (error) {
          console.error('OpenAI processing failed:', error.message);
          // res.status(500).json({ error: 'OpenAI processing failed' });
        }
    },
  },
};
</script>
