import React from 'react'
import { Link } from 'react-router-dom'
import AddNewChart from '../../components/add-chart-components/charts/AddNewChart'
import {Button} from '@dhis2-ui/button'
interface AddChartProps {
  setLayers: any
}

const AddChart = ({ setLayers }: AddChartProps) => {
  return (
    <div>
      <h1>
        Add new chart to report
      </h1>
      <AddNewChart />
      <div>
        <h3>
          Preview
        </h3>
        <Button name="add" primary value="default">
          Add to report
        </Button>
        <br /> <Link to={"/overview"}>Go to report</Link>
        <br /> <Link to={"/"}>Back</Link>
      </div>
    </div>

  )
}

export default AddChart