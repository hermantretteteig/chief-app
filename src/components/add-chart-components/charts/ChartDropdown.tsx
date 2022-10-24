import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import { Button } from '@dhis2-ui/button'
import { TextArea, InputField } from '@dhis2/ui'
import "./Dropdown.css"
import { useNavigate } from "react-router-dom";
import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, IconVisualizationBar16, IconVisualizationLine16, IconVisualizationAreaStacked16, IconVisualizationPivotTable16 } from "@dhis2/ui-icons"
import { IconAdd24, IconArrowLeft24 } from "@dhis2/ui-icons"
import { ILayer } from '../../../interfaces/Layer'
import { IChartElement, IITems } from '../../../interfaces/ChartElement'
import ShowVisualization from './ShowVisualization'
import AddText from '../../add-chart-components/text/AddText'
import ChangeTitle from './ChangeTitle'

interface DropdownProps {
  layers: ILayer[],
  setLayers: any
}
const ChartDropdown = ({ layers, setLayers }: DropdownProps) => {


  const navigate = useNavigate();

  const options = [
    { value: 'Text', text: (<><IconDataString16 />&nbsp;&nbsp;&nbsp;Text</>) },
    { value: 'COLUMN', text: (<><IconVisualizationColumn16 />&nbsp;&nbsp;&nbsp; Column</>) },
    { value: 'BAR', text: (<><IconVisualizationBar16 />&nbsp;&nbsp;&nbsp; Bar</>) },
    { value: 'LINE', text: (<><IconVisualizationLine16 />&nbsp;&nbsp;&nbsp; Line  </>) },
    { value: 'AREA', text: (<><IconVisualizationAreaStacked16 />&nbsp;&nbsp;&nbsp; Area</>) },
    { value: 'PIE', text: (<><IconVisualizationPie16 />&nbsp;&nbsp;&nbsp; Pie</>) }
  ];

  const orgnUnits = [
    { value: 'QWwg51OvU0a', text: ("Kasungo-DHO") },
    { value: 'PbfmrMdVBs3', text: ("Mtunthama Health Centre") }
  ];

  const dataSets = [
    { value: 'muC1tI7maoo', text: ("CSC-SP HIV Status Acceptance and negligence") },
    { value: 'j88kFFP79QG', text: ("CSC-SU Beliefs in other medicines like herbs") },
    { value : "gWG8giHx8G2", text : "Community Health Quarterly - percentage Households with basic latrines"},
    { value : "E5R7rBWWc8N", text : "HR percentage of Households with water treated with 1 % stock solution"},
    { value : "ldXIFF81l1e", text  : "Community Health Quarterly - percentage of Infested households sprayed with insecticides"}
  ];

  const periode = [
    { value: 'LAST_MONTH', text: ("Last month") },
    { value: 'LAST_3_MONTHS', text: ("Last 3 months") },
    { value: 'LAST_12_MONTHS', text: ("Last 12 months") },
    
    
  ];

  const checkValues = () => {
    if (selectedChart && selectedData && selectedOrgU && selectedPeriod) {
      setPropsLayers();
      setIsShown(true);
      navigate("/");
    }
    else {
    }
  }
  const setPropsLayers = () => {

    const svgElement: any = document.getElementById("the-generated-chart")?.children[0].children[0].children[0].children[0].innerHTML//.children[0];
    const blob = new Blob([svgElement], { type: 'image/svg+xml' });
    const imageObjectURL = URL.createObjectURL(blob);


    let all_layers = [...layers];

    const orgUnit = getOrgUnit();
    const dataElement = getDataElement();
    const periode = getPeriode();

    const new_layer: ILayer = {
      id: (all_layers.length).toString(),
      mainTitle: title,
      imageBlobUrl: imageObjectURL,
      chartType: selectedChart,

      orgUnitId: orgUnit.value,
      orgUnitName : orgUnit.text,

      dataElementId: dataElement.value,
      dataElementName: dataElement.text,

      timePeriodId: periode.value,
      timePeriodeName : periode.text,

      customText: selectedText
    }
    all_layers.push(new_layer)
    setLayers(all_layers)
  }

  const [selectedChart, setSelectedChart] = useState<string>('');
  const [selectedOrgU, setSelectedOrgU] = useState<string>('');
  const [selectedData, setSelectedData] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [svg, setsvg] = useState('')


    const setSvgElement = (el : string, id : string) => {
        setsvg(el)
    }

  const [dataElementMock, setDxMock] = useState<IChartElement>()
  const [periodeMock, setPeMock] = useState<IChartElement>()
  const [orgUnitMock, setOuMock] = useState<IChartElement>()
  const [showChart, setshowChart] = useState(false)
  const [isShown, setIsShown] = useState(false);
  const [buttonNotClicked, setbuttonNotClicked] = useState(true);

  const [selectedText, setSelectedtext] = useState<string>('');
  const [title, setTitle] = useState("");
 
 
  useEffect(() => {
    if (selectedChart !== "" && selectedOrgU !== "" && selectedData !== "" && selectedPeriod !== "")
      generateNewChart();
  }, [selectedChart, selectedOrgU, selectedData, selectedPeriod])



    const getOrgUnit = () => {
        return (orgnUnits.filter((dataEl : any) => {
            return dataEl.value === selectedOrgU;
        }))[0]
    }

    const getDataElement = () => {
        return (dataSets.filter((dataEl : any) => {
            return dataEl.value === selectedData;
        }))[0]
    }

    const getPeriode = () => {
        return (periode.filter((dataEl : any) => {
            return dataEl.value === selectedPeriod;
        }))[0]
    }



  const generateNewChart = () => {
    { setIsShown(false) }
    { setbuttonNotClicked(false) }
    setTitle(getPeriode().text+": "+getDataElement().text)
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

  

  return (
    <div className='container'>
      <div className='dropdown'>
        <SingleSelect className='select' selected={selectedChart} placeholder={"Select chart type"}
          value={selectedChart} onChange={handleChange}>
          {options.map((option, index) => (
            <SingleSelectOption label={option.text} key={index} value={option.value.toString()} />
          ))}
        </SingleSelect>
      </div>
      <div>
        {selectedChart === 'Text' && (
          <AddText setLayers={setLayers} layers={layers}/>
        )}
      </div>
      {selectedChart !== 'Text' && (
        <div>
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
            {!buttonNotClicked && (selectedChart !== '' || 'Text') && (
              <div style={{ color: 'red', fontSize: 'small' }}>
                *All fields needs to be selected.
              </div>
            )}

          </div>


          {
            (showChart === false) ?
              (
                <div></div>
              )
              :
              (
                <>

                  <ChangeTitle setTitle={setTitle} title={title}/>
                  <div className='flex-container'>
                    <div>
                      <ShowVisualization finishTrigger={setSvgElement} periodeMock={periodeMock} orgUnitMock={orgUnitMock} dataElementMock={dataElementMock} selectedChart={selectedChart} id={(layers.length).toString()}/>
                    </div>
                  </div>
                </>
              )

          }

          <div className="button-container">

            <Button secondary icon={<IconArrowLeft24 />} className='chartBtn' onClick={() => navigate("/")}>
              Go back
            </Button>
            <Button primary icon={<IconAdd24 />} className='chartBtn' onClick={checkValues}>
              Add chart to report
            </Button>

          </div>
          {isShown && (
            <div>
              The chart was added to your report.
            </div>

          )}
        </div>)}

    </div>
  )
}
export default ChartDropdown
