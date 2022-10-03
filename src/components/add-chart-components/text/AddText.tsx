import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import { Button } from '@dhis2-ui/button'
import { TextArea } from '@dhis2/ui'
import "./Dropdown.css"
import { IconAdd24 } from "@dhis2/ui-icons"
import { ILayer } from '../../../interfaces/Layer'
import { IChartElement, IITems } from '../../../interfaces/ChartElement'
import ChartDropdown from '../charts/ChartDropdown';
import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, 
  IconVisualizationBar16, IconVisualizationLine16, IconVisualizationAreaStacked16} from "@dhis2/ui-icons"

interface addTextprops {
  layers: ILayer[],
  setLayers: any
}

const AddText = () => {
  const options = [
    { value: 'Text', text: (<><IconDataString16 />&nbsp;&nbsp;&nbsp;Text</>) },
    { value: 'COLUMN', text: (<><IconVisualizationColumn16 />&nbsp;&nbsp;&nbsp; Column</>) },
    { value: 'BAR', text: (<><IconVisualizationBar16 />&nbsp;&nbsp;&nbsp; Bar</>) },
    { value: 'LINE', text: (<><IconVisualizationLine16 />&nbsp;&nbsp;&nbsp; Line  </>) },
    /* { value: 'PIVOT_TABLE', text: (<><IconVisualizationPivotTable16 />&nbsp;&nbsp;&nbsp; Pivot table</>) },*/
    { value: 'AREA', text: (<><IconVisualizationAreaStacked16 />&nbsp;&nbsp;&nbsp; Area</>) },
    { value: 'PIE', text: (<><IconVisualizationPie16 />&nbsp;&nbsp;&nbsp; Pie</>) }
  ]; 
      const handleChange = (e: any) => {
        if (e.selected == 'Text'){

        }
        
      }
    
      const [selectedChart, setSelectedChart] = useState<string>('');
      const navigate = useNavigate();
      return (
        <div className='container'>
          <div className='dropdown'>
            <SingleSelect className='select' selected={selectedChart} placeholder={"Select chart type"}
              value={selectedChart} onChange={handleChange}>
              {options.map((option, index) => (
                <SingleSelectOption key={index} value={option.value.toString()} label={option.text} />
              ))}
            </SingleSelect>
          </div>
          <div>

          </div>

    
    
          <Button secondary icon={<IconAdd24 />} className='chartBtn' >
            Add chart to report
          </Button>
          {() => navigate("/")}
        </div>
                 
      )
    }


export default AddText