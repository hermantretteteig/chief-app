import React from 'react'
import { Link } from 'react-router-dom'
import AddNewChart from '../../components/add-chart-components/charts/AddNewChart'
import { ILayer } from '../../interfaces/Layer';

interface AddChartProps {
  layers : ILayer[],
  setLayers : any;
}
const AddChart = ({ layers, setLayers }: AddChartProps) => {
  return (
    <div>
      <h1>
        Add new chart to report
      </h1>
      <AddNewChart layers={layers} setLayers={setLayers}/>
      <div>
        <br /> <Link to={"/"}>Back</Link>
      </div>
    </div>

  )
}

export default AddChart