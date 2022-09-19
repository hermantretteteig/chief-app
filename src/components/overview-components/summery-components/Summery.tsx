import React from 'react'
import { ILayer } from '../../../interfaces/Layer'
import { fake_layers } from './FakeData';
import SummeryLayer from './SummeryLayer';

interface SummeryProps {
  layers : ILayer[],
  setLayers : any
}


const Summery = ({layers} : SummeryProps) => {

  layers = fake_layers;

  return (
    <div>
 
      {
      layers.map((layer : ILayer) => (
          <SummeryLayer layer={layer}/>
      ))
  }</div>
  )
}




export default Summery