import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import { Button } from '@dhis2-ui/button'
import { TextArea } from '@dhis2/ui'
import "./Dropdown.css"
import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, IconVisualizationBar16, IconVisualizationLine16, IconVisualizationAreaStacked16, IconVisualizationPivotTable16 } from "@dhis2/ui-icons"
import { IconAdd24 } from "@dhis2/ui-icons"
import { ILayer } from '../../../interfaces/Layer'
import { IChartElement, IITems } from '../../../interfaces/ChartElement'
import ShowVisualization from './ShowVisualization'
import AddText from '../../add-chart-components/text/AddText'

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

  const checkValues = () => {
    if (selectedChart && selectedData && selectedOrgU && selectedPeriod) {
      setPropsLayers();
      setIsShown(true)
    }
    else {
    }
  }
  const setPropsLayers = () => {

    let all_layers = [...layers];

    const new_layer: ILayer = {
      id: '2',
      mainTitle: dataName[1],
      imageBlobUrl: "",
      chartType: selectedChart,
      orgUnit: orgName[1],
      dataElement: dataName[1],
      timePeriod: selectedPeriod,
      index: all_layers.length - 1,
      customText: selectedText
    }
    all_layers.push(new_layer)
    setLayers(all_layers)
  }

  const [selectedChart, setSelectedChart] = useState<string>('');
  const [selectedOrgU, setSelectedOrgU] = useState<string>('');
  const [selectedData, setSelectedData] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const [dataElementMock, setDxMock] = useState<IChartElement>()
  const [periodeMock, setPeMock] = useState<IChartElement>()
  const [orgUnitMock, setOuMock] = useState<IChartElement>()
  const [showChart, setshowChart] = useState(false)
  const [isShown, setIsShown] = useState(false);
  const [buttonNotClicked, setbuttonNotClicked] = useState(true);

  const [selectedText, setSelectedtext] = useState<string>('');

  const onButtonGenerate = () => {
    { setIsShown(false) }
    { setbuttonNotClicked(false) }
    {
      if (selectedChart && selectedData && selectedOrgU && selectedPeriod) {
        { setbuttonNotClicked(true) }
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
      else {
        <div>
        </div>
      }
    }
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

  const TextInput = () => {
    const [textInput, setTextInput] = useState("");
    const onChangeInput = useCallback(
      (e) => {
        console.log(e)
        setTextInput(e.value);
      },
      [textInput]
    );
    return (
      <TextArea
        id='textArea'
        name='textArea'
        placeholder='Write a comment...'
        onChange={onChangeInput}
        value={textInput}
      />
    );
  }

  const orgName = orgnUnits.map((org) => (
    (org.value == selectedOrgU) ?
      (
        org.text
      )
      : (
        ''
      )
  ))
  const dataName = dataSets.map((dataEl) => (
    (dataEl.value == selectedData) ?
      (
        dataEl.text
      )
      : (
        ''
      )
  ))

  const mockExtraOptions = {
    dashboard: false,
    noData: {
      text: 'No data',
    },
  }

  const props = {
    style: { maxHeight: 600, maxWidth: 550, width: "100vw" },
    id: 1,
    responses: [],
    extraOptions: mockExtraOptions,
    legendSets: [],
    forDashboard: true,
    visualization: {
      type: selectedChart,
      columns: [dataElementMock],
      rows: [periodeMock],
      filters: [orgUnitMock],
    }
  }

  return (
    <div className='container'>
      <div className='dropdown'>
        <SingleSelect className='select' selected={selectedChart} placeholder={"Select chart type"} clearText="Clear" clearable
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
        {!buttonNotClicked && (selectedChart != '' || 'Text') && (
          <div style={{ color: 'red', fontSize: 'small' }}>
            *All fields needs to be selected.
          </div>
        )}
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
              <div className='flex-container'>
                <div>
                  <ShowVisualization props={props} />
                </div>

                <div className='area'>
                  <TextInput />
                </div>

              </div>
            </>
          )

      }


      <Button secondary icon={<IconAdd24 />} className='chartBtn' onClick={checkValues}>
        Add chart to report
      </Button>
      {isShown && (
        <div>
          The chart was added to your report.
        </div>

      )}


    </div>
  )
}
export default ChartDropdown