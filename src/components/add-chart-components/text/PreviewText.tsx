import React from 'react'
import "./preview-text-style.css"

interface PreviewTextProps {
    theme : string,
    mainTitle : string,
    customText : string
}

export const PreviewText = ({theme, mainTitle, customText} : PreviewTextProps) => {


    const getColor = () => {
        if(theme === "DANGER"){
            return {background : "#ec1318", font : "white"}
        }
        if(theme === "STANDARD"){
            return {background : "#f2f2f2", font : "black"}
        }
        if(theme === "SUCCESS"){
            return {background : "#5DA295", font : "white"}
        }
    }


  return (
    <div>
        
        <div className="text-container text-wrapper" style={{backgroundColor : getColor()?.background}}>
            <div style={{color : getColor()?.font}}>
                <span className='title-text'>{mainTitle}<br/></span>
                <span className='custom-text'>{customText}</span>
            </div>
        </div>

    </div>
  )
}
