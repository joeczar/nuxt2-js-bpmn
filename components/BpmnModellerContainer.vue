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
    position: absolute;
    top: -20px;
    left: -20px;
    height: 30px;
    width: 30px;
    background-color: aquamarine;
    content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000000' d='M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L13,8.35V4H11V8.35L5.18,18.43C5.07,18.59 5,18.79 5,19M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6M13,16L14.34,14.66L16.27,18H7.73L10.39,13.39L13,16M12.5,12A0.5,0.5 0 0,1 13,12.5A0.5,0.5 0 0,1 12.5,13A0.5,0.5 0 0,1 12,12.5A0.5,0.5 0 0,1 12.5,12Z' /%3E%3C/svg%3E") !important;
  }
}
</style>
