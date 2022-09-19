import React from 'react'
import ChartPlugin from "@dhis2/data-visualizer-plugin"

export const ShowChart = (props) => {
  return (
    <div id="234"> 
        <ChartPlugin {...props.data}/>
    </div>
  )
}
