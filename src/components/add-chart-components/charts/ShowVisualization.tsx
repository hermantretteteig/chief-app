import React from 'react'
import ChartPlugin from "@dhis2/data-visualizer-plugin"

interface ShowVisualizationProps {
    props : any
}

const ShowVisualization = ({props} : ShowVisualizationProps) => {
  return (
    <div id="234"> 
        <ChartPlugin {...props}/>
    </div>
  )
}

export default ShowVisualization