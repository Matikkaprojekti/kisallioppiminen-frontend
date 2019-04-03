import React from 'react'

const Definition = (props: any) => {
  return (
    <div>
      <div className="definition-header">
        <h3 className="definition-header-content"> Määritelmä: {props.header} </h3>
      </div>

      <div className="definition-content">
        <div className="definition-text">{props.children}</div>
      </div>
    </div>
  )
}

export default Definition
