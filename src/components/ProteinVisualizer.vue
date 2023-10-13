<template>
  <div id="viewport" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as NGL from 'ngl';

export default {
  name: 'ProteinVisualizer',
  mounted() {
    this.initVisualization();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    initVisualization() {
      // Create NGL Stage object
      this.stage = new NGL.Stage("viewport");

      // Handle window resizing
      window.addEventListener("resize", this.handleResize, false);

      // Load PDB entry 1CRN
      this.stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
    },
    handleResize() {
      this.stage.handleResize();
    }
  }
};
</script>
