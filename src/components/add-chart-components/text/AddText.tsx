import React, { useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@dhis2-ui/button'
import { TextArea, InputField } from '@dhis2/ui'
import "../charts/ChartDropdown"
import { IconAdd24 } from "@dhis2/ui-icons"

const AddText = () => {
  const navigate = useNavigate();

  const [textInput, setTextInput] = useState("");
  const onchangeText = (e: any) => {
    setTextInput(e.value)
  }

  const [titleInput, setTitleInput] = useState("");
  const onchangeIn = (e: any) => {
    setTitleInput(e.value)
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
      <div className='btn-place'>
        <Button primary icon={<IconAdd24 />} className='chartBtn' onClick={() => navigate("/")} >
          Add text to report
        </Button>
      </div>
    </div>
  )
}


export default AddText