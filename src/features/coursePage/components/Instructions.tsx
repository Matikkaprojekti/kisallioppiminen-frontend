import React, { Component } from 'react'
import { Col, Card } from 'react-materialize'

export class Instructions extends Component<{ instructions: string }> {
  render() {

    return (
      <div className="container">
        <Col m={6} s={12}>
          <Card className="teal acent-2" textClassName="white-text" title="Osa 1">
            {this.props.instructions}
            {'$$1 \\ \\% = \\frac{1}{100} = 0{,}01.$$'}
          </Card>
        </Col>
      </div >
    )
  }
}

export default Instructions
