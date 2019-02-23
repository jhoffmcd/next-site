import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../../new/button'

class Step extends React.Component {
  render() {
    const { disabled, selected, name, href, as } = this.props

    return (
      <div>
        <Button
          className={classNames('step-btn', { 'step-selected': selected })}
          href={href ? href : undefined}
          as={as}
          disabled={disabled}
          invert={selected}
          light
        >
          {name}
        </Button>
        <style jsx global>{`
          .step-btn.step-selected {
            font-weight: 600;
          }
          .step-btn.disabled {
            color: #ccc;
            cursor: not-allowed;
          }
        `}</style>
        <style jsx>{`
          div {
            margin-right: 1rem;
            display: inline-block;
          }
        `}</style>
      </div>
    )
  }
}

class StepBar extends React.Component {
  renderStep(step, index) {
    const { courseId, lessonId, currentStepId } = this.props

    const selected = step.id === currentStepId
    const name = step.points + (selected ? ' points' : '')

    if (!step.visited) {
      return <Step key={index} name={name} disabled />
    }

    return (
      <Step
        key={index}
        selected={selected}
        href={`/learn/content?course=${courseId}&lesson=${lessonId}&step=${step.id}`}
        as={`/learn/${courseId}/${lessonId}/${step.id}`}
        name={name}
      />
    )
  }

  render() {
    const { steps, courseId, lessonId, currentStepId } = this.props

    return (
      <div>
        {// hide when not start
        steps.length ? (
          <Step
            selected={!currentStepId}
            href={`/learn/content?course=${courseId}&lesson=${lessonId}`}
            as={`/learn/${courseId}/${lessonId}`}
            name="Introduction"
          />
        ) : null}
        {steps.map((s, i) => this.renderStep(s, i))}
      </div>
    )
  }
}

StepBar.propTypes = {
  steps: PropTypes.array,
  courseId: PropTypes.string,
  lessonId: PropTypes.string,
  currentStepId: PropTypes.string
}

StepBar.fragment = c =>
  c.createFragment(`
  fragment on Step {
    id,
    points,
    visited
  }
`)

export default StepBar
