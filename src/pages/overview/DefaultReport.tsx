import React, { useState, useRef, useEffect } from 'react'
import { ILayer } from '../../interfaces/Layer';
import "./overview-styles/overview.css"
import { IChartElement, IITems } from '../../interfaces/ChartElement'
import ShowVisualization from '../../components/add-chart-components/charts/ShowVisualization';
import { dataElement, orgUnit, period } from '../../components/add-chart-components/standard-reports/config-standard';
import { CircularLoader } from '@dhis2-ui/loader'
import { useLayerContext } from '../../contexts/LayerContext';


interface DefaultProps {
    generatedChart: boolean
    setGeneratedChart: (selectedType: boolean) => void
    setReportType: (report: string) => void
}
const DefaultReport = ({ setGeneratedChart, generatedChart, setReportType }: DefaultProps) => {


    const { layers, setLayers } = useLayerContext()

    const defaultOrgUnit = orgUnit;
    const defaultDataEl = dataElement;
    const defaultPeriod = period;

    const defaultOrgUnit1 = orgUnit;
    const defaultDataEl1 = dataElement;
    const defaultPeriod1 = period;

    const defaultOrgUnit2 = orgUnit;
    const defaultDataEl2 = dataElement;
    const defaultPeriod2 = period;

    const [element, setelement] = useState("");
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('');
    const [chart, setChart] = useState('');
    const [selectedPeriod, setselectedPeriod] = useState('')


    useEffect(() => {
        if (element !== '') {
            //console.log(element);
            setPropsLayers();
            setCount(count + 1)
            console.log(count)
        }
    }, [element])

    const setPropsLayers = () => {
        //const svgElement: any = document.getElementById("the-generated-chart")?.children[0].children[0].children[0].children[0].innerHTML//.children[0];
        const blob = new Blob([element], { type: 'image/svg+xml' });
        const imageObjectURL = URL.createObjectURL(blob);

        console.log(imageObjectURL)

        let all_layers = [...layers];
        if (count == 0) {
            setTitle("Community Health Quarterly - percentage Households with basic latrines");
            setChart('COLUMN')
            setselectedPeriod('LAST_12_MONTHS')
            console.log('hei')
        }
        if (count == 1){
            setTitle("Community Health Quarterly - percentage of Infested households sprayed with insecticides");
            setChart('BAR')
            setselectedPeriod('LAST_12_MONTHS')
        }
        if (count == 2){
            setTitle("HR percentage of Households with water treated with 1 % stock solution");
            setChart('COLUMN')
            setselectedPeriod('LAST_3_MONTHS')
        }
        const new_layer: ILayer = {
            id: (all_layers.length).toString(),
            mainTitle: title,
            imageBlobUrl: imageObjectURL,
            chartType: chart,
            orgUnitName: "Mtunthama Health Centre",
            dataElementName: title,
            timePeriodeName: selectedPeriod,
            customText: ''
        }
        console.log(new_layer)
        all_layers.push(new_layer)
        setLayers(all_layers)
        if (count == 2) {
            setGeneratedChart(true)
            setReportType('def')
        }
    }

    return (
        <div>
            <CircularLoader />
            <div className='showChart'>
                <ShowVisualization finishTrigger={setelement} selectedChart='COLUMN' dataElementMock={defaultDataEl} periodeMock={defaultPeriod} orgUnitMock={defaultOrgUnit} />
            </div>
            <div className='showChart'>
                <ShowVisualization finishTrigger={setelement} selectedChart='BAR' dataElementMock={defaultDataEl1} periodeMock={defaultPeriod1} orgUnitMock={defaultOrgUnit1} />
            </div>
            <div className='showChart'>
                <ShowVisualization finishTrigger={setelement} selectedChart='COLUMN' dataElementMock={defaultDataEl2} periodeMock={defaultPeriod2} orgUnitMock={defaultOrgUnit2} />
            </div>
        </div>
    )
}
export default DefaultReport
