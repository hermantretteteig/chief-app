import React, { useState, useRef, useEffect } from 'react'
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import "./Dropdown.css"
import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, IconVisualizationBar16, IconVisualizationLine16 } from "@dhis2/ui-icons"
import { ILayer } from '../../../interfaces/Layer'

interface DropdownProps {
  layers: ILayer[],
  setLayers: any
}
const ChartDropdown = ({ layers, setLayers }: DropdownProps) => {
  const [selectedChart, setSelectedChart] = useState<string>('');
  const [selectedOrgU, setSelectedOrgU] = useState<string>('');
  const [selectedData, setSelectedData] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const options = [
    { value: 'Text', text: (<><IconDataString16 /> Text</>) },
    { value: 'Column', text: (<><IconVisualizationColumn16 /> Column</>) },
    { value: 'Bar', text: (<><IconVisualizationBar16 />Bar</>) },
    { value: 'Line', text: (<><IconVisualizationLine16 /> Line  </>) },
    { value: 'Pie', text: (<><IconVisualizationPie16 />Pie</>) }
  ];

  const handleChange = (e: string) => {
    console.log("heeeer", e)
    setSelectedChart(e)
  }
  return (
    <div className='container'>
      <div className='dropdown'>
        <SingleSelect className='select' placeholder="Select chart type"
          value={selectedChart} onChange={(e: string) => handleChange(e)}>
          {options.map((option) => (
            <SingleSelectOption key={option.value} value={option.value} label={option.text} />
          ))}
        </SingleSelect>
      </div>

      {console.log("valgt verdi", selectedChart)}
      <div className='dropdown'>
        <SingleSelect className='select'
          placeholder="Select organisation unit" value={selectedOrgU} onChange={(e: string) => setSelectedOrgU(e)}>
          <div>
            {layers.map((orgunit) => (
              <SingleSelectOption key={orgunit.id} label={orgunit.orgUnit} value={orgunit.orgUnit} />
            ))
            }
          </div>
        </SingleSelect>
      </div>
      <div className='dropdown'>
        <SingleSelect className='select' placeholder="Select data element">
          <div>
            {layers.map((dataEl) => (
              <SingleSelectOption key={dataEl.id} label={dataEl.dataElement} value={dataEl.dataElement} />
            ))
            }
          </div>
        </SingleSelect>
      </div>
      <div className='dropdown'>
        <SingleSelect className='select'
          placeholder="Select time period">
          <div>
            {layers.map((pe) => (
              <SingleSelectOption key={pe.id} label={pe.dataElement} value={pe.timePeriod} />
            ))
            }
          </div>
        </SingleSelect>
      </div>
    </div>
  )
}
export default ChartDropdown