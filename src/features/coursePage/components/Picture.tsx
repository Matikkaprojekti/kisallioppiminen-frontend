import React, { useState } from 'react'

const Picture = (props: any) => {
  const imageText: string = props.imagestyle
  const imageObject: { [k: string]: string } = {}
  imageText.split(';').forEach((e: string) => {
    const parts = e.split(':')
    imageObject[parts[0]] = parts[1]
  })
  return (
    <div>
      <img className="image" src={props.imagesrc} alt={props.alt} style={imageObject} />
    </div>
  )
}

export default Picture
