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
          <button
            id="js-create-diagram"
            class="btn"
            @click.prevent="createNewDiagram($event)"
          >
            create diagram
          </button>
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
    <div class="download-controls">
      <button class="btn diagram-btn" @click="downloadDiagram">
        <span class="icon">
          <i class="mdi mdi-download"></i>
        </span>
        <span class="text">Download Diagram</span>
      </button>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import newDiagram from '../assets/newDiagram.bpmn'
import customRendererModule from '@/bpmn/renderers'
import customControlsModule from '@/bpmn/controls'

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
      additionalModules: [customRendererModule, customControlsModule],
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
    downloadDiagram() {
      this.modeller.saveXML({ format: true }, (err, xml) => {
        if (err) {
          console.error(err)
        } else {
          const link = document.createElement('a')
          link.href =
            'data:application/bpmn+xml;charset=UTF-8,' + encodeURIComponent(xml)
          link.download = 'diagram.bpmn'
          link.click()
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.model-container {
  height: 100%;
  width: 99%;
  display: flex;
  flex-direction: column;
  flex: grow;

  .content {
    height: 100%;
    background-color: azure;
    color: black;

    .canvas {
      height: 95%;
    }
  }

  .download-controls {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
  }

  .btn {
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.25rem;
    border: 2px solid #ccc;
    margin: auto 1rem;
  }

  .bpmn-icon-task.flask::before {
  }
}
</style>
