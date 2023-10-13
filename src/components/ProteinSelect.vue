<template>
  <div class="p-4">
    <!-- Tab Navigation -->
    <div class="mb-4">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        :class="[
          'px-4 py-2',
          activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
        ]"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <!-- Display Data Based on Tab -->
    <ProteinElement
      :sequenceData="currentTabData.sequenceData"
      :helixBias="currentTabData.helixBias"
      :strandBias="currentTabData.strandBias"
      :loopBias="currentTabData.loopBias"
    />
  </div>
</template>

<script>
import ProteinElement from '@/components/ProteinElement';

export default {
  components: {
    ProteinElement
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          name: 'Tab 1',
          data: {
            sequenceData: 'AGTC...',
            helixBias: 0.05,
            strandBias: 0.04,
            loopBias: 0.01
          }
        },
        {
          name: 'Tab 2',
          data: {
            sequenceData: 'CGTA...',
            helixBias: 0.03,
            strandBias: 0.05,
            loopBias: 0.02
          }
        },
        {
          name: 'Tab 3',
          data: {
            sequenceData: 'TACG...',
            helixBias: 0.04,
            strandBias: 0.02,
            loopBias: 0.03
          }
        },
        {
          name: 'Tab 4',
          data: {
            sequenceData: 'GTCA...',
            helixBias: 0.05,
            strandBias: 0.01,
            loopBias: 0.04
          }
        },
      ]
    };
  },
  computed: {
    currentTabData() {
      return this.tabs[this.activeTab].data;
    }
  }
}
</script>

<style scoped>
/* Additional styles, if necessary, can be added here */
</style>
