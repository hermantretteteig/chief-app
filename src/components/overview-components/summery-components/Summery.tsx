import React from 'react'
import { ILayer } from '../../../interfaces/Layer'

interface SummeryProps {
  layers : ILayer[],
  setLayers : any
}

const Summery = ({layers} : SummeryProps) => {
  return (
    <div>
      Summery
      {
      layers.map((layer : ILayer) => (
          <p>{layer.mainTitle}</p>
      ))
  }</div>
  )
}

export default Summery