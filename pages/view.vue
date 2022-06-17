<template>
  <div id="canvas" ref="workflowContainer" class="workflow-container"></div>
</template>

<script>
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js'
import pizzaColab from '../assets/pizza-collaboration.bpmn'

export default {
  name: 'BpmnWorkflow',
  // layout: 'BpmnLayout',
  data() {
    return {
      bpmnJS: null,
      workflowContainer: null,
      xml: null,
    }
  },
  async fetch() {
    const result = await this.$http.$get(pizzaColab)
    // console.log("fetch", { result: `${result.body}` })
    this.xml = result
  },
  created() {
    this.bpmnJS = new BpmnJS()
    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get(this.workflowContainer).zoom('fit-viewport')
      }
    })
  },
  async mounted() {
    this.workflowContainer = this.$refs.workflowContainer
    this.bpmnJS.attachTo(this.workflowContainer)
    // this.bpmnJS.get(this.workflowContainer).zoom('fit-viewport');
    await this.$fetch()

    this.importWorkflow(this.xml)
  },
  unmounted() {
    this.bpmnJS.destroy()
    this.viewer.destroy()
  },
  methods: {
    importWorkflow(workflow) {
      this.bpmnJS
        .importXML(workflow)
        .then((result) => {
          console.log('result', result)
          const { warnings } = result
          console.log('success !', warnings)
          this.bpmnJS.get(this.workflowContainer).zoom('fit-viewport')
        })
        .catch((error) => {
          console.log('importWorkflow error', error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.bpmn-workflow {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  height: 100%;
  width: 99%;
}

.workflow-container {
  background-color: azure;
  height: 100%;
  width: 99%;
}
</style>
