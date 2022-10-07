import React from 'react'
import ChartPlugin from "@dhis2/data-visualizer-plugin"

interface ShowVisualizationProps {
    props : any
}

const ShowVisualization = ({props} : ShowVisualizationProps) => {
  return (
    <div id="the-generated-chart"> 
        <ChartPlugin {...props}/>
    </div>
  )
}

export default ShowVisualization