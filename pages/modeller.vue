<template>
  <BpmnModellerContainer></BpmnModellerContainer>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
// import BpmnModeller from '~/components/BpmnModeller.vue';
export default {
  name: 'BpmnModeller',
  // layout: 'BpmnLayout',
  data() {
    return {
      modeller: null,
      workflowContainer: null,
    }
  },
  computed: {},
  created() {
    this.modeller = new BpmnModeler({
      container: this.workflowContainer,
    })
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
