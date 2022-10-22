import React, { useState, useRef, useEffect } from 'react'
import { ILayer } from '../../../interfaces/Layer'
import ChartDropdown from '../../add-chart-components/charts/ChartDropdown'
/*import FakeData from '../../add-chart-components/charts/FakeData'*/

interface AddChartProps {
  layers : ILayer[],
  setLayers : any,
}

const AddNewChart = ({layers, setLayers}) => {

return(
  <div>
    <ChartDropdown layers={layers} setLayers={setLayers}/>
  </div>

)
}

export default AddNewChart