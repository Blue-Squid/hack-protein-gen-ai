<template>
 
  <div class="grid grid-cols-2 gap-4 p-4">
    <!-- Sequence Input -->
    <div class="col-span-2">
        <p class="text-gray-700">sequence: {{ sequenceData }}</p>
    </div>
    
    <!-- Biases Information -->
    <div class="col-span-1">
      <p class="text-gray-700">helix bias: {{ helixBias }}</p>
      <p class="text-gray-700 mt-2">strand bias: {{ strandBias }}</p>
      <p class="text-gray-700 mt-2">loop bias: {{ loopBias }}</p>
    </div>

    <!-- Mock Graph -->
    <div class="col-span-1 bg-gray-300 rounded-md p-4">
      <!-- Here, in a real-world scenario, a charting component would be rendered -->
      <ProteinVisualizer />

    </div>


    
  </div>
</template>

<script>
import ProteinVisualizer from '@/components/ProteinVisualizer'

export default {
  components: {
    'ProteinVisualizer': ProteinVisualizer
  },
  props: {
    sequenceData: {
      type: String,
      default: ''
    },
    helixBias: {
      type: Number,
      default: 0
    },
    strandBias: {
      type: Number,
      default: 0
    },
    loopBias: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
/* Additional styles, if necessary, can be added here */
</style>
