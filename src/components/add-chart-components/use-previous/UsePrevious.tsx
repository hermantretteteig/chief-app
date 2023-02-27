import React, { useState, useEffect, useRef } from 'react'
import { IPreviousReport } from '../../../interfaces/PreviousReport';
import { Button } from "@dhis2/ui";
import { IconArrowRight24, IconCross24 } from "@dhis2/ui-icons"
import "./use-previous.css";
import ShowVisualization from '../charts/ShowVisualization';
import { ILayer } from '../../../interfaces/Layer';
import { IChartElement } from '../../../interfaces/ChartElement';
import { LayerContext, useLayerContext } from '../../../contexts/LayerContext';
import { useNavigate } from 'react-router-dom';
import { PreviewText } from '../text/PreviewText';

interface UsePreviousProps {
    reports: IPreviousReport[];
    onFinish: () => void
    skip: boolean,
    setLastUsedReportTitle : (e : string) => void;
    setModal? : (e : boolean) => void;
}

export const UsePrevious = ({ reports, setModal, onFinish: onLastUsedFinished, setLastUsedReportTitle, skip }: UsePreviousProps) => {

    const [layersToGenerate, setLayersToGenerate] = useState<ILayer[]>([]);
    const [numOfChartGenerated, setnumOfChartGenerated] = useState(0);

    const { setLayers } = useLayerContext()

    const makeIChartElement = (dim: string, idToItem: string): IChartElement => {
        return {
            dimension: dim,
            items: [
                { id: idToItem }
            ],

        }
    }

    const onCreatedChart = (blobUrl: string, id: string) => {

        let layersToChange = [...layersToGenerate];

        for (let i = 0; layersToChange.length > i; i++) {
            if (layersToChange[i].id === id) {

                setLayersToGenerate(layersToChange);

                const blob = new Blob([blobUrl], { type: 'image/svg+xml' });
                layersToChange[i].imageBlobUrl = URL.createObjectURL(blob);

                setnumOfChartGenerated(prev => prev + 1);
                return;
            }
        }
    }

    const isInitialMount = useRef(true);
    useEffect(() => {

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        let layersThatAreImage = 0;
        layersToGenerate.forEach((lay: ILayer) => {
            if (lay.imageBlobUrl !== "")
                layersThatAreImage++
        })

        if (numOfChartGenerated === layersThatAreImage) {    
            setLayers(layersToGenerate)
            onLastUsedFinished();
        }


    }, [numOfChartGenerated])



    const onSelectPrevReport = (report: IPreviousReport) => {
        setLastUsedReportTitle(report.reportTitle);
        setLayersToGenerate(report.layers);
    }
    
    return (
        <div>
            {
                (layersToGenerate.length === 0) ?
                    (
                        
                        (skip != true) ? (
                            <>
                                <div className='flex-use-previous-header'>
                                    <b className='title-last-three'>Last three reports:</b>
                                    <Button small destructive onClick={() => setModal!(false)}icon={<IconCross24/>}/>
                                </div> 


                                <table className='use-prev-table'>
                                    <thead className='table-head'>
                                        <tr>
                                            <td className='use-prev-cells'>
                                                Name:
                                            </td>
                                            <td className='use-prev-cells'>
                                                Date created:
                                            </td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.sort(function (a, b) { return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(); }).map((obj: IPreviousReport, i) => (
                                            
                                            <tr key={i} className="td-margin">
                                                <td className='use-prev-cells'>{obj.reportTitle}</td>
                                                <td className='use-prev-cells'>{obj.dateCreated.toString().slice(0, 10)}</td>
                                                <td className='use-prev-cells float-button-right margin-left-open-button'><Button onClick={() => onSelectPrevReport(obj)} icon={<IconArrowRight24 />}>open</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table></>
                       )
                       :
                       (
                        <>
                        {reports.map((obj: IPreviousReport, i) => (
                        onSelectPrevReport(obj)
                        ))}
                        </>

                       )
                                        
                    )
                                        
                    :
                    (
                        <>
                            <h4 style={{textAlign : "center"}}>Loading..</h4>

                            {

                                layersToGenerate.map((obj: ILayer, i) => (


                                    (obj.imageBlobUrl !== "") ? (
                                        <div key={i} style={{ opacity: 0, maxHeight: "0px" }}>
                                            <ShowVisualization finishTrigger={onCreatedChart} selectedChart={obj.chartType} dataElementMock={makeIChartElement("dx", obj.dataElementId)} periodeMock={makeIChartElement("pe", obj.timePeriodId)} orgUnitMock={makeIChartElement("ou", obj.orgUnitId)} id={obj.id} />
                                        </div>
                                    ) :
                                        (<div key={i}></div>)





                                ))

                            }
                        </>


                    )



            }
        </div>
    )
}

