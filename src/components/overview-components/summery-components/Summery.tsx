import React from 'react'
import { ILayer } from '../../../interfaces/Layer'
import { fake_layers } from './FakeData';
import SummeryLayer from './SummeryLayer';

interface SummeryProps {
  layers : ILayer[],
  setLayers : any,
}


const Summery = ({layers} : SummeryProps) => {

  return (
    <div>
      {
        layers.map((layer : ILayer, index) => (
          <div key={index}>
            <SummeryLayer index={index} layer={layer}/>
          </div>
        ))
      }
    </div>
  )
}




export default Summery