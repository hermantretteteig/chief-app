import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddNewChart from '../../components/add-chart-components/charts/AddNewChart'
import ChartDropdown from '../../components/add-chart-components/charts/ChartDropdown';
import { ILayer } from '../../interfaces/Layer';
import { Option } from '../../interfaces/OrgUnit';
import { IconArrowLeft24 } from "@dhis2/ui-icons"
import { Button } from '@dhis2-ui/button'
import './addchart.css'

interface AddChartProps {
  layers: ILayer[],
  setLayers: any;
  orgUnits: Option[]
}
const AddChart = ({ layers, setLayers, orgUnits }: AddChartProps) => {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <div className='flex'>
        <Button secondary icon={<IconArrowLeft24 />} className='btn' onClick={() => navigate("/")}>
          
        </Button>
        <h2 className='add'>
          Add new chart to report
        </h2>
        <div className='hidden'>
        
        </div>
      </div>
      <div className='add-container'>
        <ChartDropdown orgUnits={orgUnits} layers={layers} setLayers={setLayers} />
      </div>
    </div>
  )
}

export default AddChart