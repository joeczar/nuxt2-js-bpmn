const SUITABILITY_SCORE_HIGH = 100
const SUITABILITY_SCORE_AVERGE = 50
const SUITABILITY_SCORE_LOW = 25
const FLASK_IDENTIFIER = 'flask-task'

export default class CustomContextPad {
  constructor(
    bpmnFactory,
    config,
    contextPad,
    create,
    elementFactory,
    injector,
    translate
  ) {
    this.bpmnFactory = bpmnFactory
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
    }

    contextPad.registerProvider(this)
  }

  getContextPadEntries(element) {
    const { autoPlace, bpmnFactory, create, elementFactory, translate } = this
    function appendFlaskTask(suitabilityScore) {
      return function (event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:Task')

          businessObject.suitable = suitabilityScore

          const shape = elementFactory.createShape({
            type: 'bpmn:Task',
            businessObject,
          })

          autoPlace.append(element, shape)
        } else {
          appendFlaskTaskStart(event, element)
        }
        console.log('appendFlaskTask', suitabilityScore)
      }
    }
    function appendFlaskTaskStart(suitabilityScore) {
      console.log('appendFlaskTaskStart', suitabilityScore)
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:Task')

        businessObject.suitable = suitabilityScore

        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject,
        })

        create.start(event, shape, element)
      }
    }
    function appendServiceTask(suitabilityScore) {
      return function (event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:Task')

          businessObject.suitable = suitabilityScore

          const shape = elementFactory.createShape({
            type: 'bpmn:Task',
            businessObject,
          })

          autoPlace.append(element, shape)
        } else {
          appendServiceTaskStart(event, element)
        }
      }
    }

    function appendServiceTaskStart(suitabilityScore) {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:Task')

        businessObject.suitable = suitabilityScore

        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject,
        })

        create.start(event, shape, element)
      }
    }

    return {
      'append.flask-task': {
        group: 'activity',
        className: 'bpmn-icon-task flask',
        title: translate('Create Task with Flask Icon'),
        action: {
          dragstart: appendFlaskTaskStart(FLASK_IDENTIFIER),
          click: appendFlaskTask(FLASK_IDENTIFIER),
        },
      },
      'append.low-task': {
        group: 'model',
        className: 'bpmn-icon-task red',
        title: translate('Append Task with low suitability score'),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_LOW),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_LOW),
        },
      },
      'append.average-task': {
        group: 'model',
        className: 'bpmn-icon-task yellow',
        title: translate('Append Task with average suitability score'),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_AVERGE),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_AVERGE),
        },
      },
      'append.high-task': {
        group: 'model',
        className: 'bpmn-icon-task green',
        title: translate('Append Task with high suitability score'),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_HIGH),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_HIGH),
        },
      },
    }
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
]
