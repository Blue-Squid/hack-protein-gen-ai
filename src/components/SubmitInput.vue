<!-- src/components/SubmitInput.vue -->


<template>
  <form class="max-w-4xl mx-auto px-4 py-8" @submit.prevent="submitInput">
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
    
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="apiKey" class="block text-sm font-medium leading-6 text-gray-900">Api Key</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input type="password" v-model="apiKey" name="apiKey" id="apiKey" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label for="inputValue" class="block text-sm font-medium leading-6 text-gray-900">About</label>
          <div class="mt-2">
            <textarea id="inputValue" v-model="inputValue" name="inputValue" rows="3" class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your resource</p>
        </div>
      </div>
    </div>

  </div>

  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
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
      apiKey: ""
    };
  },
  methods: {
    async submitInput() {
      try {
          const configuration = new Configuration({
            apiKey: this.apiKey,
          });
          const openai = new OpenAIApi(configuration);
          this.sanitizeInputValue();
          await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: this.generatePrompt(),
            max_tokens: 700,
            temperature: 1,
          }).then(gptResponse => {
            console.log('GPT response:', gptResponse.data.choices[0].text.trim());
            const response = axios.post(`${API_URL}/dois`, {
              data: this.payload(btoa(gptResponse.data.choices[0].text.trim())),
            }, {
              headers: auth.getAuthHeader(),
            }).then(response => this.gotoFabrica(response));
            console.log('Submission successful:', response.data);
            this.inputValue = '';
          })
        this.inputValue = '';
      } catch (error) {
        console.error('Submission failed:', error.message);
      }
    },
    payload(xml) {
      return {
          type: 'dois',
          attributes: {
            doi: `10.80225/${this.generateRandomString()}`,
            source: 'fabricaGPT',
            state: "draft",
            xml: xml,
            mode: "upload"
          },
      };
    },
    gotoFabrica(response) {
      if (response.status === 201) {
        window.open(`${FABRICA_URL}/dois/${encodeURIComponent(response.data.data.id)}/edit`, '_blank').focus();
        // window.location.href = `${FABRICA_URL}/dois/${encodeURIComponent(response.data.data.id)}/edit`;
      }
    },
    generatePrompt() {
      // const prompt = `Create the metadata, using datacite schema and xml format, of a dataset on the titled “${this.inputValue}” under a cc-by license and authored by Jon Doe`;
      const prompt = `Create the metadata file, using DataCite schema and XML format, of a resource on the about a given TOPIC. 
      The identifier MUST be empty. Do not include contributors. The resource is under a cc-by license and is authored by Jon Doe. Include subjects. The subjects must use the FOS OECD subject scheme. Include a title and description. The type of resource is a dataset.
      TOPIC: ${this.inputValue}`;
      return prompt;
    },
    sanitizeInputValue() {
      this.inputValue = this.inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
    },
    generateRandomString() {
      const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
      let randomString = '';
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    },
  },
};
</script>
