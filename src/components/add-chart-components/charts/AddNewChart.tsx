import React, { useState, useRef, useEffect } from 'react'
import { ILayer } from '../../../interfaces/Layer'
import { Option } from '../../../interfaces/OrgUnit'
import ChartDropdown from '../../add-chart-components/charts/ChartDropdown'
/*import FakeData from '../../add-chart-components/charts/FakeData'*/


/*NOT IN USE*/

interface AddChartProps {
  layers : ILayer[],
  setLayers : any,
  orgUnits : Option[]
}

const AddNewChart = ({layers, setLayers}) => {

return(
  <div>
    {/*<ChartDropdown layers={layers} setLayers={setLayers}/>*/}
  </div>

)
}

export default AddNewChart