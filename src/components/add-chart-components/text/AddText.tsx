import React, { useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@dhis2-ui/button'
import { TextArea, InputField } from '@dhis2/ui'
import "../charts/ChartDropdown"
import { IconAdd24 } from "@dhis2/ui-icons"
import { ILayer } from '../../../interfaces/Layer';
import { PreviewText } from './PreviewText';
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'

interface AddTextProps {
    layers : ILayer[],
    setLayers : (layers : ILayer[]) => void
}

const AddText = ({layers, setLayers} : AddTextProps) => {
  const navigate = useNavigate();

  const [textInput, setTextInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [theme, setTheme] = useState("STANDARD");


  const onChangeTheme = (e : any) => {
    setTheme(e.selected)
  }

  const onchangeText = (e: any) => {
    setTextInput(e.value)
  }
  const onchangeIn = (e: any) => {
    setTitleInput(e.value)
  }

  const addTextToReport = (e : any) => {
    let all_layers = [...layers];

    const new_layer: ILayer = {
      id: (all_layers.length).toString(),
      mainTitle: titleInput,
      imageBlobUrl: "",
      chartType: "",
      orgUnitName: "",
      orgUnitId : "",
      dataElementId : "",
      dataElementName: "",
      timePeriodId: "",
      timePeriodeName : "",
      theme : theme,
      customText: textInput
    }
    all_layers.push(new_layer)
    setLayers(all_layers)
    navigate("/")
  }

  return (
    <div className='container'>
      <div className='title'>
        <InputField
          id='Title'
          name='Title'
          placeholder='Title...'
          onChange={onchangeIn}
          value={titleInput}
        />
      </div>
      <div className='textfield'>
        <TextArea
          id='textArea'
          name='textArea'
          placeholder='Description...'
          onChange={onchangeText}
          value={textInput}
        />
       </div>
      <div className='textfield'>
      <SingleSelect selected={theme} className='select' placeholder="Select data element" value={theme} onChange={onChangeTheme}>
              
                <SingleSelectOption key={0} label={"Standard"} value={"STANDARD"} />
                <SingleSelectOption key={1} label={"Danger"} value={"DANGER"} />
                <SingleSelectOption key={2} label={"Success"} value={"SUCCESS"} />

        </SingleSelect>
        <p>Preview:</p>
        </div>
      
        <PreviewText mainTitle={titleInput} customText={textInput} theme={theme} />

      <div className='btn-place'>
        <Button primary icon={<IconAdd24 />} className='chartBtn' onClick={addTextToReport} >
          Add text to report
        </Button>
      </div>
    </div>
  )
}


export default AddText