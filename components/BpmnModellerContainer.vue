<template>
  <div class="model-container">
    <div
      id="js-drop-zone"
      ref="container"
      class="content"
      :class="{ hasDiagram }"
    >
      <div class="message intro">
        <div class="note">
          Drop BPMN diagram from your desktop or
          <a
            id="js-create-diagram"
            href
            @click.prevent="createNewDiagram($event)"
            >create a new diagram</a
          >
          to get started.
        </div>
      </div>

      <div v-if="xmlError" class="message error">
        <div class="note">
          <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

          <div class="details">
            <span>cause of the problem</span>
            <pre>{{ errorMessage }}</pre>
          </div>
        </div>
      </div>

      <div id="js-canvas" ref="canvas" class="canvas"></div>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import newDiagram from '../assets/newDiagram.bpmn'

export default {
  data: () => ({
    container: null,
    canvas: null,
    xml: null,
    xmlError: false,
    errorMessage: null,
    hasDiagram: false,
    diagram: null,
    modeller: null,
  }),
  async fetch() {
    const result = await this.$http.$get(newDiagram)

    console.log('fetch', { result })
    this.xml = result
  },
  mounted() {
    this.container = this.$refs.container
    this.canvas = this.$refs.canvas
    this.modeller = new BpmnModeler({
      container: this.canvas,
    })

    this.modeller.attachTo(this.canvas)
  },
  beforeUnmount() {
    this.modeller.destroy()
  },
  methods: {
    createNewDiagram(e) {
      this.openDiagram(this.xml)
    },
    async openDiagram(xml) {
      try {
        await this.modeller.importXML(xml, (err) => {
          if (err) {
            console.error(err)
          }
        })
        this.xmlError = false
        this.hasDiagram = true
      } catch (error) {
        console.log(error)
        this.xmlError = true
        this.hasDiagram = false
        this.errorMessage = error.message
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.model-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: grow;

  .content {
    height: 100%;
    background-color: azure;
    color: black;

    .canvas {
      height: 100%;
    }
  }
}
</style>
