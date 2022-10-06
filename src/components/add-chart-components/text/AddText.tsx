import React, { useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@dhis2-ui/button'
import { TextArea } from '@dhis2/ui'
import "../charts/ChartDropdown"
import { IconAdd24 } from "@dhis2/ui-icons"

const AddText = (selectedValue: any) => {
  const TextInput = () => {
    const [textInput, setTextInput] = useState("");
    const onChangeInput = useCallback(
      (e) => {
        setTextInput(e.value);
      },
      [textInput]
    );
    return (
      <div className='textfield'>
        <TextArea
          id='textArea'
          name='textArea'
          placeholder='Description...'
          onChange={onChangeInput}
          value={textInput}
        />
      </div>
    );
  }

  const TitleInput = () => {
    const [titleInput, setTitleInput] = useState("");
    const onChangeInput = useCallback(
      (e) => {
        setTitleInput(e.value);
      },
      [titleInput]
    );
    return (
      <div className='title'>
        <TextArea
          id='Title'
          name='Title'
          placeholder='Title...'
          onChange={onChangeInput}
          value={titleInput}
        />
      </div>
    );
  }

  const addDescription = () => {
    <div>
      The text was added to your report.
    </div>
  }

  return (
    <div className='container'>
      <TitleInput />
      <TextInput />
      <Button secondary icon={<IconAdd24 />} className='chartBtn' onClick={addDescription} >
        Add text to report
      </Button>
    </div>

  )
}


export default AddText