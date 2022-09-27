import React, { useState, useRef, useEffect } from 'react'
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import { Button } from '@dhis2-ui/button'
import "./Dropdown.css"
import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, IconVisualizationBar16, IconVisualizationLine16, IconVisualizationAreaStacked16, IconVisualizationPivotTable16 } from "@dhis2/ui-icons"
import { IconAdd24 } from "@dhis2/ui-icons"
import { ILayer } from '../../../interfaces/Layer'
import * as analytics from '@dhis2/analytics'
import ChartPlugin from "@dhis2/data-visualizer-plugin"
import { IChartElement, IITems } from '../../../interfaces/ChartElement'
import ShowVisualization from './ShowVisualization'

interface DropdownProps {
  layers: ILayer[],
  setLayers: any
}
const ChartDropdown = ({ layers, setLayers }: DropdownProps) => {

  const options = [
    { value: 'Text', text: (<><IconDataString16 />&nbsp;&nbsp;&nbsp;Text</>) },
    { value: 'COLUMN', text: (<><IconVisualizationColumn16 />&nbsp;&nbsp;&nbsp; Column</>) },
    { value: 'BAR', text: (<><IconVisualizationBar16 />&nbsp;&nbsp;&nbsp; Bar</>) },
    { value: 'LINE', text: (<><IconVisualizationLine16 />&nbsp;&nbsp;&nbsp; Line  </>) },
    /* { value: 'PIVOT_TABLE', text: (<><IconVisualizationPivotTable16 />&nbsp;&nbsp;&nbsp; Pivot table</>) },*/
    { value: 'AREA', text: (<><IconVisualizationAreaStacked16 />&nbsp;&nbsp;&nbsp; Area</>) },
    { value: 'PIE', text: (<><IconVisualizationPie16 />&nbsp;&nbsp;&nbsp; Pie</>) }
  ];

  const orgnUnits = [
    { value: 'at6UHUQatSo', text: ("Boa") },
    { value: 'ImspTQPwCqd', text: ("Sierra Leone") },
  ];

  const dataSets = [
    { value: 'lyLU2wR22tC', text: ("ART monthly summary") },
    { value: 'cYeuwXTCPkU', text: ("Child Health") },
    { value: 'vc6nF5yZsPR', text: ("HIV Care Monthly") }

  ];

  const periode = [
    { value: 'LAST_12_MONTHS', text: ("Last 12 months") },
    { value: 'LAST_MONTH', text: ("Last months") },
  ];
  /*
    const setPropsLayers = () => {
  
        let all_layers = [...layers];
  
        const new_layer: ILayer = {
            mainTitle : "ere",
            imageBlobUrl : ""
        }
  
        setLayers(all_layers)
    }
  */

  const [selectedChart, setSelectedChart] = useState<string>("");
  const [selectedOrgU, setSelectedOrgU] = useState<string>('');
  const [selectedData, setSelectedData] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const [dataElementMock, setDxMock] = useState<IChartElement>()
  const [periodeMock, setPeMock] = useState<IChartElement>()
  const [orgUnitMock, setOuMock] = useState<IChartElement>()
  const [showChart, setshowChart] = useState(false)


  const onButtonGenerate = () => {

    const _dataElementMock: IChartElement = {
      dimension: "dx",
      items: [
        { id: selectedData }
      ]
    }

    const _periodeMock: IChartElement = {
      dimension: "pe",
      items: [
        { id: selectedPeriod }
      ]
    }

    const _orgUnitMock: IChartElement = {
      dimension: "ou",
      items: [
        { id: selectedOrgU }
      ]
    }

    setDxMock(_dataElementMock);
    setPeMock(_periodeMock);
    setOuMock(_orgUnitMock);
    setshowChart(true);

  }


  const handleChange = (e: any) => {
    setshowChart(false);
    setSelectedChart(e.selected)
  }
  const handleOrgU = (e: any) => {
    setshowChart(false);
    setSelectedOrgU(e.selected)
  }
  const handleData = (e: any) => {
    setshowChart(false);
    setSelectedData(e.selected)
  }
  const handlePeriod = (e: any) => {
    setshowChart(false);
    setSelectedPeriod(e.selected)
  }

  const mockExtraOptions = {
    dashboard: false,
    noData: {
      text: 'No data',
    },
  }

  const props = {
    style: { height: 400, width: 300 },
    id: 1,
    //onChartGenerated: () => setConvertSVG(true),//onSVGButton(),
    responses: [],
    extraOptions: mockExtraOptions,
    legendSets: [],
    forDashboard: true,
    visualization: {
      type: selectedChart,
      columns: [dataElementMock],
      rows: [periodeMock],
      filters: [orgUnitMock],
    }//something
  }

  return (
    <div className='container'>
      <div className='dropdown'>
        <SingleSelect className='select' selected={selectedChart} placeholder={"Select chart type"}
          value={selectedChart} onChange={handleChange}>
          {options.map((option, index) => (
            <SingleSelectOption key={index} value={option.value.toString()} label={option.text} />
          ))}
        </SingleSelect>
      </div>

      <div className='dropdown'>
        <SingleSelect className='select'
          placeholder="Select organisation unit" value={selectedOrgU} selected={selectedOrgU} onChange={(e: string) => handleOrgU(e)}>
          {orgnUnits.map((orgunit, index) => (
            <SingleSelectOption key={index} label={orgunit.text} value={orgunit.value} />
          ))
          }
        </SingleSelect>
      </div>
      <div className='dropdown'>
        <SingleSelect selected={selectedData} className='select' placeholder="Select data element" value={selectedData} onChange={(e: string) => handleData(e)}>
          {dataSets.map((dataEl, index) => (
            <SingleSelectOption key={index} label={dataEl.text} value={dataEl.value} />
          ))
          }
        </SingleSelect>
      </div>
      <div className='dropdown'>
        <SingleSelect selected={selectedPeriod} className='select'
          placeholder="Select time period" value={selectedPeriod} onChange={(e: string) => handlePeriod(e)}>
          {periode.map((pe, index) => (
            <SingleSelectOption key={index} label={pe.text} value={pe.value} />
          ))
          }
        </SingleSelect>

        <Button className='chartBtn' onClick={onButtonGenerate}>
          Generate chart
        </Button>

      </div>


      {
        (showChart === false) ?
          (
            <div></div>
          )
          :
          (
            <><h2>
              {dataSets.map((set) => (
                orgnUnits.map((org) => (
                  (org.value == selectedOrgU && set.value == selectedData) ?
                  (
                    <div>{set.text} in {org.text}</div>
                  )
                  : (
                    <div></div>
                  )
              ))))}
            
            </h2>
            <div className = 'chart'>
            <ShowVisualization props={props} />
            </div>

            </>
          )
      }


      <Button secondary icon={<IconAdd24 />}>
        Add chart to report
      </Button>


    </div>
  )
}
export default ChartDropdown