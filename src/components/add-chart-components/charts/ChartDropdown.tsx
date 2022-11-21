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
import { Option } from '../../../interfaces/OrgUnit'

interface DropdownProps {
  layers: ILayer[],
  setLayers: any,
  orgUnits : Option[]
}
const ChartDropdown = ({ layers, setLayers/*, orgUnits*/ }: DropdownProps) => {


    const orgUnits: Option[] = [
        { id: 'lNsSSuNKbIP', name: "Chamba Health Centre (Machinga)" },
    ];
    

  const navigate = useNavigate();

  const options: Option[] = [
    { id: 'Text', name: (<><IconDataString16 />&nbsp;&nbsp;&nbsp;Text</>) },
    { id: 'COLUMN', name: (<><IconVisualizationColumn16 />&nbsp;&nbsp;&nbsp; Column</>) },
    //{ id: 'BAR', name: (<><IconVisualizationBar16 />&nbsp;&nbsp;&nbsp; Bar</>) },
    { id: 'LINE', name: (<><IconVisualizationLine16 />&nbsp;&nbsp;&nbsp; Line  </>) },
    //{ id: 'AREA', name: (<><IconVisualizationAreaStacked16 />&nbsp;&nbsp;&nbsp; Area</>) },
    //{ id: 'PIE', name: (<><IconVisualizationPie16 />&nbsp;&nbsp;&nbsp; Pie</>) }
  ];

  const dataSets: Option[] = [
    { id: 'D8XkZuxMnpp', name: "CR-IM-AG-Number of children under-1 of age that received the last dose (third dose) of pentavalent vaccine according to the recommended national schedule of vaccination" },
    { id: "BD1AoZbS7Yc", name: "CR-ANC-AG-Number of under 1-year-old children protected at birth from Tetanus-diphtheria (Td)"},
    { id: "a0z7vwBOz6k", name: "CR-ANC-AG-Number of under 1-year-old children who received all doses of Penta."},
    { id: "SMknRS6QO5M", name: "CR-ANC-AG-Number of pregnant women who received at least two home visits during pregnancy by HSA"},
    { id: "tPPrQAHdPof", name: "CR-ANC-AG-Number of pregnant women with one or more danger signs referred to health facility by an HSA"}
];

  const periode: Option[] = [
    { id: 'LAST_MONTH', name: "Last month" },
    { id: 'LAST_3_MONTHS', name: "Last 3 months" },
    { id: 'LAST_12_MONTHS', name: "Last 12 months" }
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

    const svgElement: any = document.getElementById("the-generated-chart-"+layers.length)?.children[0].children[0].children[0].children[0].innerHTML//.children[0];

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

      orgUnitId: orgUnit.id,
      orgUnitName : orgUnit.name as string,

      dataElementId: dataElement.id,
      dataElementName: dataElement.name as string,

      timePeriodId: periode.id,
      timePeriodeName : periode.name as string,

      customText: selectedText
    }

    all_layers.push(new_layer)
    setLayers(all_layers)
  }

  const [selectedChart, setSelectedChart] = useState<string>('');
  const [selectedOrgU, setSelectedOrgU] = useState<string>('');
  const [selectedData, setSelectedData] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [svg, setsvg] = useState<string | any>('')


    const setSvgElement = (el : string, id : string) => {
        setsvg(el)
        setfetchingData(false);
    }

  const [dataElementMock, setDxMock] = useState<IChartElement>()
  const [periodeMock, setPeMock] = useState<IChartElement>()
  const [orgUnitMock, setOuMock] = useState<IChartElement>()
  const [showChart, setshowChart] = useState(false)
  const [isShown, setIsShown] = useState(false);
  const [buttonNotClicked, setbuttonNotClicked] = useState(true);

  const [selectedText, setSelectedtext] = useState<string>('');
  const [title, setTitle] = useState("");

  const [fetchingData, setfetchingData] = useState<boolean>(false)
 
 
  useEffect(() => {
    if (selectedChart !== "" && selectedOrgU !== "" && selectedData !== "" && selectedPeriod !== "")
      generateNewChart();
  }, [selectedChart, selectedOrgU, selectedData, selectedPeriod])



    const getOrgUnit = () => {
        return (orgUnits.filter((dataEl : Option) => {
            return dataEl.id === selectedOrgU;
        }))[0]
    }

    const getDataElement = () => {
        return (dataSets.filter((dataEl : Option) => {
            return dataEl.id === selectedData;
        }))[0]
    }

    const getPeriode = () => {
        return (periode.filter((dataEl : Option) => {
            return dataEl.id === selectedPeriod;
        }))[0]
    }



  const generateNewChart = () => {
    setIsShown(false)
    setbuttonNotClicked(false)
    setTitle(getPeriode().name+": "+getDataElement().name)
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
        setfetchingData(true);
      }
      else {
        <div></div>
      }
    }
  }

  const handleChartChart = (e: any) => {
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
          value={selectedChart} onChange={handleChartChart}>
          {options.map((option, index) => (
            <SingleSelectOption label={option.name as string} key={index} value={option.id} />
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
              {orgUnits.map((orgunit, index) => (
                <SingleSelectOption key={index} label={orgunit.name} value={orgunit.id} />
              ))
              }
            </SingleSelect>
          </div>
          <div className='dropdown'>
            <SingleSelect selected={selectedData} className='select' placeholder="Select data element" value={selectedData} onChange={(e: string) => handleData(e)}>
              {dataSets.map((dataEl, index) => (
                <SingleSelectOption key={index} label={dataEl.name} value={dataEl.id} />
              ))
              }
            </SingleSelect>
          </div>
          <div className='dropdown'>
            <SingleSelect selected={selectedPeriod} className='select'
              placeholder="Select time period" value={selectedPeriod} onChange={(e: string) => handlePeriod(e)}>
              {periode.map((pe, index) => (
                <SingleSelectOption key={index} label={pe.name} value={pe.id} />
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

{
            (fetchingData === true) ? 
                (<div className='data-is-loading'>Loading..</div>) :
                (<div></div>)
          }


          <div className="button-container">

            <Button destructive icon={<IconArrowLeft24 />} className='chartBtn' onClick={() => navigate("/")}>
                Go back
            </Button>
            <Button disabled={svg === ""} primary icon={<IconAdd24 />} className='chartBtn' onClick={checkValues}>
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
