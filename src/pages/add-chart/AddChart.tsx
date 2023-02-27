import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddLayer from '../../components/add-chart-components/charts/AddLayer';
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
          {}
        </Button>
        <h2 className='add'>
          Add new element to report
        </h2>
        <div className='hidden'>
        
        </div>
      </div>
      <div className='add-container'>
        <AddLayer orgUnits={orgUnits} layers={layers} setLayers={setLayers} />
      </div>
    </div>
  )
}

export default AddChart