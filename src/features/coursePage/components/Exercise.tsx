import React, { Component } from 'react'
import { Col, Card } from 'react-materialize'

export class Exercise extends Component<{
  exercise: { question: string; options: string[] }
}> {
  render() {
    let key = 1

    return (
      <div className="container">
        <Col m={6} s={12}>
          <Card
            className="teal acent-2"
            textClassName="white-text"
            title="Tehtävä 1"
            actions={[
              <a key={key++} href="/">
                Näytä vastaus
              </a>
            ]}
          >
            <p>{this.props.exercise.question}</p>

            {this.props.exercise.options.map(exercise => (
              <span>{exercise}</span>
            ))}
          </Card>
        </Col>
      </div>
    )
  }
}

export default Exercise
