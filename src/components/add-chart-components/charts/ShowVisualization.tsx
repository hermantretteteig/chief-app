import React, { useState } from 'react'
import ChartPlugin from "@dhis2/data-visualizer-plugin"
import { IChartElement } from '../../../interfaces/ChartElement'

interface ShowVisualizationProps {
    //mockExtraOptions : any,
    selectedChart : string,
    id : string,
    dataElementMock : IChartElement | undefined,
    periodeMock : IChartElement | undefined,
    orgUnitMock : IChartElement | undefined,
    finishTrigger : (el : string, id : string) => void;
}

const ShowVisualization = ({selectedChart, dataElementMock, periodeMock, orgUnitMock, finishTrigger, id} : ShowVisualizationProps) => {


    const mockExtraOptions = {
        dashboard: false,
        noData: {
          text: 'No data',
        },
      }

     

  const [chartProps] = useState({
    style: { maxHeight: 600, maxWidth: 600, width: "100vw" },
    id: 1,
    responses: [],
    extraOptions: mockExtraOptions,
    legendSets: [],
    forDashboard: false,
    visualization: {
      type: selectedChart,
      columns: [dataElementMock],
      rows: [periodeMock],
      filters: [orgUnitMock],
    },

    
    onChartGenerated : () => {
        setTimeout(() => {
            finishTrigger(document.getElementById("the-generated-chart-"+id)?.children[0].children[0].children[0].children[0].innerHTML as string, id)
        }, 200);        
    }

  })

  return (
    <div id={"the-generated-chart-"+id}> 
        <ChartPlugin {...chartProps}/>
    </div>
  )
}

export default ShowVisualization