<template>
  <div class="p-4 space-y-6 bg-white shadow-md rounded-md">
    <!-- Inputs Section -->
    <div>
      <h2 class="text-lg font-semibold">INPUTS</h2>
      <div class="space-y-4">
        <!-- Start Sequence Section -->
        <div>
          <label>Start Sequence</label>
          <p>Specify the protein length for complete unconditional generation...</p>
          <div>
            <!-- <input type="radio" name="sequence" id="protein-length" value="protein-length">
            <label for="protein-length">protein length</label> -->
            <!-- <input type="radio" name="sequence" id="custom-sequence" value="custom-sequence"> -->
            <label for="custom-sequence">custom sequence</label>
          </div>
          <textarea id="custom-sequence" v-model="customSequence" placeholder="custom sequence"></textarea>
        </div>
        <!-- Optional Parameters Section -->
        <div>
          <label>Secondary Structure</label>
          <p>Try changing the sliders...</p>
          <div>
            <!-- <input type="radio" name="structure" id="sliders" value="sliders">
            <label for="sliders">sliders</label>
            <input type="radio" name="structure" id="explicit" value="explicit">
            <label for="explicit">explicit</label> -->
          </div>
          <div>
            <label>helix bias</label>
            <input type="range" min="0" max="0.05" step="0.0001" v-model="helixBias">
            {{ helixBias }}
          </div>
          <div>
            <label>strand bias</label>
            <input type="range" min="0" max="0.05" step="0.0001" v-model="strandBias">
            {{ strandBias }}
          </div>
          <div>
            <label>loop bias</label>
            <input type="range" min="0" max="0.2" step="0.001" v-model="loopBias">
            {{ loopBias }}
          </div>
        </div>
      </div>
    </div>
    <!-- Outputs Section -->
    <!-- ... -->
     <div class="mt-6">
      <button @click="generate" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Generate</button>
    </div>

    <div class="mt-6">
      <p class="text-gray-800">{{ apiResponse }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { client } from "@gradio/client";


export default {
  data() {
    return {
      helixBias: 0,
      strandBias: 0,
      loopBias: 0,
      customSequence: '',
       apiResponse: ''
    };
  },
  methods: {
    async generate() {
      try {
        // Adjust the API endpoint and structure as per your backend requirements
        const endpoint = "https://your-api-endpoint.com/generate";
        const payload = {
          helixBias: this.helixBias,
          strandBias: this.strandBias,
          loopBias: this.loopBias,
          customSequence: this.customSequence
        }


        const gradio = await client("https://merle-protein-generator.hf.space/");
        const result = await gradio.predict(3, [		
                "Howdy!", // string  in 'PDB ID' Textbox component		
                "Howdy!", // string  in 'contigs' Textbox component
          ]);

        console.log(result.data);

        console.log(payload);
        const response = await axios.post(endpoint, payload);
        this.apiResponse = response.data;
        // Handle the response as needed
        console.log(response.data);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional Tailwind styles or custom styles here */
</style>
