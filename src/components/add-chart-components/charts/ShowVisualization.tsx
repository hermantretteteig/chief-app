import React, { useState } from 'react'
import ChartPlugin from "@dhis2/data-visualizer-plugin"
import { IChartElement } from '../../../interfaces/ChartElement'

interface ShowVisualizationProps {
    //mockExtraOptions : any,
    selectedChart : string,
    dataElementMock : IChartElement | undefined,
    periodeMock : IChartElement | undefined,
    orgUnitMock : IChartElement | undefined
}

const ShowVisualization = ({selectedChart, dataElementMock, periodeMock, orgUnitMock} : ShowVisualizationProps) => {


    const mockExtraOptions = {
        dashboard: false,
        noData: {
          text: 'No data',
        },
      }

  const [chartProps] = useState({
    style: { maxHeight: 600, maxWidth: 550, width: "100vw" },
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
    }
  })

  return (
    <div id="the-generated-chart"> 
        <ChartPlugin {...chartProps}/>
    </div>
  )
}

export default ShowVisualization