import React from 'react'
import { Link } from 'react-router-dom'
import AddNewChart from '../../components/add-chart-components/charts/AddNewChart'
import {Button} from '@dhis2-ui/button'
import { IconAdd24 } from "@dhis2/ui-icons"
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
        <h3>
          Preview
        </h3>
        <Button secondary icon={<IconAdd24/>}>
            Add chart to report
       </Button>
        <br /> <Link to={"/"}>Back</Link>
      </div>
    </div>

  )
}

export default AddChart