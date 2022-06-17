import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate,
} from 'tiny-svg'

import { getRoundRectPath } from 'bpmn-js/lib/draw/BpmnRenderUtil'

import { is, getBusinessObject } from 'bpmn-js/lib/util/ModelUtil'

import { isNil } from 'min-dash'

// eslint-disable-next-line one-var
const HIGH_PRIORITY = 1500,
  TASK_BORDER_RADIUS = 2,
  COLOR_GREEN = '#52B415',
  COLOR_YELLOW = '#ffc800',
  COLOR_RED = '#cc0000'

const FLASK_IDENTIFIER = 'flask-task'

const flaskIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M6,22A3,3 0 0,1 3,19C3,18.4 3.18,17.84 3.5,17.37L9,7.81V6A1,1 0 0,1 8,5V4A2,2 0 0,1 10,2H14A2,2 0 0,1 16,4V5A1,1 0 0,1 15,6V7.81L20.5,17.37C20.82,17.84 21,18.4 21,19A3,3 0 0,1 18,22H6M5,19A1,1 0 0,0 6,20H18A1,1 0 0,0 19,19C19,18.79 18.93,18.59 18.82,18.43L16.53,14.47L14,17L8.93,11.93L5.18,18.43C5.07,18.59 5,18.79 5,19M13,10A1,1 0 0,0 12,11A1,1 0 0,0 13,12A1,1 0 0,0 14,11A1,1 0 0,0 13,10Z" /></svg>`

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY)

    this.bpmnRenderer = bpmnRenderer
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element)

    const suitabilityScore = this.getSuitabilityScore(element)

    if (!isNil(suitabilityScore)) {
      const color = this.getColor(suitabilityScore)

      const rect = drawRect(parentNode, 50, 20, TASK_BORDER_RADIUS, color)

      svgAttr(rect, {
        transform: 'translate(-20, -10)',
      })

      const text = svgCreate('text')

      svgAttr(text, {
        fill: '#fff',
        transform: 'translate(-15, 5)',
      })

      svgClasses(text).add('djs-label')

      svgAppend(text, document.createTextNode(suitabilityScore))

      svgAppend(parentNode, text)
    }
    if (suitabilityScore === FLASK_IDENTIFIER) {
      console.log('FLASK_IDENTIFIER')
      const color = '#2196F3'
      const rect = drawRect(parentNode, 50, 50, TASK_BORDER_RADIUS, color)
      svgAttr(rect, {
        transform: 'translate(-20, -10)',
      })
      const icon = svgCreate('image')
      svgAttr(icon, {
        transform: 'translate(-15, 5)',
      })
      svgClasses(icon).add('flask-icon')
      svgAppend(icon, flaskIcon)
      svgAppend(parentNode, icon)
      console.log('FLASK_IDENTIFIER', { rect, icon })
    }

    return shape
  }

  getShapePath(shape) {
    if (is(shape, 'bpmn:Task')) {
      return getRoundRectPath(shape, TASK_BORDER_RADIUS)
    }

    return this.bpmnRenderer.getShapePath(shape)
  }

  getSuitabilityScore(element) {
    const businessObject = getBusinessObject(element)

    const { suitable } = businessObject

    return Number.isFinite(suitable) ? suitable : null
  }

  getColor(suitabilityScore) {
    if (suitabilityScore > 75) {
      return COLOR_GREEN
    } else if (suitabilityScore > 25) {
      return COLOR_YELLOW
    }

    return COLOR_RED
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer']

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, color) {
  const rect = svgCreate('rect')

  svgAttr(rect, {
    width,
    height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: color,
    strokeWidth: 2,
    fill: color,
  })

  svgAppend(parentNode, rect)

  return rect
}
