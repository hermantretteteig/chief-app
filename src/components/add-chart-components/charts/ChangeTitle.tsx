import React, {useState} from 'react'
import { InputField, Button } from '@dhis2/ui'
import "./change-title-styles.css"
import { IconEdit24 } from "@dhis2/ui-icons"

interface ChangeTitleProps{
    setTitle : (e : string) => void;
    title : string;
}

const ChangeTitle = ({setTitle, title} : ChangeTitleProps) => {

    const [editMode, seteditMode] = useState(false)

    const changeMode = () => {

        seteditMode(prew => !prew)
    }

    const onChangeTitle = (e : any) => {
        
        setTitle(e.target.value)
    }


  return (
    <div>
        <div className='title-container'>
            <div className='title-around'>
                {(editMode === false) ?
                    (
                        <div className='title-change'>
                            {title}
                        </div>
                    )
                    :
                    (
                    
                        <input
                            className='inputfield'
                            name='Title'
                            id="title-input-field"
                            onChange={onChangeTitle}
                            value={title}
                            autoFocus
                        />
                     
                    )
                }
            </div>
       
                <Button className='button-edit' icon={<IconEdit24/>} onClick={changeMode}>Edit title</Button>
    
        </div>
            


    </div>


  )
}

export default ChangeTitle