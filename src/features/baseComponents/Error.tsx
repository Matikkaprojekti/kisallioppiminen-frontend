import React from 'react'

export default function Error({isVisible, message}: {isVisible: boolean, message: string}) {

  return (
    <div className={`global_error${isVisible ? '-visible' : ''}`}>
      <p className="error-text">{message}</p>
    </div>
  )
}
