import React, { useState, useRef, useEffect } from 'react'
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import "./Dropdown.css"
import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, IconVisualizationBar16, IconVisualizationLine16 } from "@dhis2/ui-icons"

const AddNewChart = () => {
  //Legg in options, prøv å knytt de til en handling for å se
  const [selectedChart, setSelectedChart] = useState<string>("")
 
  const options = [
    { value: 'text', text: (<>Text<IconDataString16/> </>) },
    { value: 'col', text: (<><IconVisualizationColumn16 color='green  '/> Column</>) },
    { value: 'bar', text: (<div className = 'row'><IconVisualizationBar16 color = 'blue'/>Bar</div>) },
    { value: 'line', text: (<><IconVisualizationLine16 color= 'red'/> Line  </>) },
    { value: 'pie', text: (<><IconVisualizationPie16 color='orange'/>Pie</>)}
  ];
  options.map(option => (
    console.log(option.value)
  ))
 

  return (
    <div className='container'>
      <div className = 'dropdown'>
        <SingleSelect className='select' placeholder="Select chart type" value={selectedChart}>
          {options.map((option) => (
            <SingleSelectOption key={option.value} value={option.value} label={option.text}/>
          ))}
        </SingleSelect>
      </div>
      <div className = 'dropdown'>
        <SingleSelect className='select'
          placeholder="Select organisation unit">
          <div>
            <SingleSelectOption label="option one" value="1" />
            <SingleSelectOption label="option two" value="2" />
            <SingleSelectOption label="option three" value="3" />
          </div>
        </SingleSelect>
      </div>
      <div className = 'dropdown'>
        <SingleSelect className='select' placeholder="Select data element">
          <div>
            <SingleSelectOption label="option one" value="1" />
            <SingleSelectOption label="option two" value="2" />
            <SingleSelectOption label="option three" value="3" />
          </div>
        </SingleSelect>
      </div>
      <div className = 'dropdown'>
        <SingleSelect className='select'
          placeholder="Select time period">
          <div>
            <SingleSelectOption label="option one" value="1" />
            <SingleSelectOption label="option two" value="2" />
            <SingleSelectOption label="option three" value="3" />
          </div>
        </SingleSelect>
      </div>
    </div>
  )
}

export default AddNewChart