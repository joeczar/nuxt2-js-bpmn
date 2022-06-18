const SUITABILITY_SCORE_HIGH = 100
const SUITABILITY_SCORE_AVERGE = 50
const SUITABILITY_SCORE_LOW = 25
const FLASK_IDENTIFIER = 'flask-task'

export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate

    palette.registerProvider(this)
  }

  getPaletteEntries(element) {
    const { bpmnFactory, create, elementFactory, translate } = this

    function createTask(suitabilityScore) {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:Task')

        businessObject.suitable = suitabilityScore

        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject,
        })
        create.start(event, shape)
      }
    }

    return {
      'create.flask-task': {
        group: 'activity',
        className: 'bpmn-icon-task flask blue',
        title: translate('Create Task with Flask Icon'),
        action: {
          dragstart: createTask(FLASK_IDENTIFIER),
          click: createTask(FLASK_IDENTIFIER),
        },
      },
      'create.low-task': {
        group: 'activity',
        className: 'bpmn-icon-task red',
        title: translate('Create Task with low suitability score'),
        action: {
          dragstart: createTask(SUITABILITY_SCORE_LOW),
          click: createTask(SUITABILITY_SCORE_LOW),
        },
      },
      'create.average-task': {
        group: 'activity',
        className: 'bpmn-icon-task yellow',
        title: translate('Create Task with average suitability score'),
        action: {
          dragstart: createTask(SUITABILITY_SCORE_AVERGE),
          click: createTask(SUITABILITY_SCORE_AVERGE),
        },
      },
      'create.high-task': {
        group: 'activity',
        className: 'bpmn-icon-task green',
        title: translate('Create Task with high suitability score'),
        action: {
          dragstart: createTask(SUITABILITY_SCORE_HIGH),
          click: createTask(SUITABILITY_SCORE_HIGH),
        },
      },
    }
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate',
]
