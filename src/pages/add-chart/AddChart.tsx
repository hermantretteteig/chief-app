import React from 'react'
import { Link } from 'react-router-dom'
import AddNewChart from '../../components/add-chart-components/charts/AddNewChart'
import ChartDropdown from '../../components/add-chart-components/charts/ChartDropdown';
import { ILayer } from '../../interfaces/Layer';
import { Option } from '../../interfaces/OrgUnit';

interface AddChartProps {
  layers : ILayer[],
  setLayers : any;
  orgUnits : Option[]
}
const AddChart = ({ layers, setLayers, orgUnits }: AddChartProps) => {
  return (
    <div>
      <h1>
        Add new chart to report
      </h1>
      <ChartDropdown orgUnits={orgUnits} layers={layers} setLayers={setLayers}/>

    </div>

  )
}

export default AddChart