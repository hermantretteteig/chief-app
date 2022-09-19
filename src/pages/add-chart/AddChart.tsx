import React from 'react'
import { Link } from 'react-router-dom'

interface AddChartProps {
  setLayers : any
}

const AddChart = ({setLayers} : AddChartProps) => {
  return (
    <div>AddChart
         <br/> <Link to={"/"}>Back</Link>
    </div>

  )
}

export default AddChart