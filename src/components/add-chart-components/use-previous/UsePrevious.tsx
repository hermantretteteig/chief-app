import React, {useState, useEffect, useRef} from 'react'
import { IPreviousReport } from '../../../interfaces/PreviousReport';
import { Button } from "@dhis2/ui";
import { IconArrowRight24 } from "@dhis2/ui-icons"
import "./use-previous.css";
import ShowVisualization from '../charts/ShowVisualization';
import { ILayer } from '../../../interfaces/Layer';
import { IChartElement } from '../../../interfaces/ChartElement';
import { LayerContext, useLayerContext } from '../../../contexts/LayerContext';
import { useNavigate } from 'react-router-dom';

interface UsePreviousProps {
    reports : IPreviousReport[];
    setModalOpen : (open : boolean) => void
}

export const UsePrevious = ({reports, setModalOpen} : UsePreviousProps) => {

    const [layersToGenerate, setLayersToGenerate] = useState<ILayer[]>([]);
    const [numOfChartGenerated, setnumOfChartGenerated] = useState(0);

    const { layers, setLayers } = useLayerContext()
    
    const makeIChartElement = (dim : string, idToItem : string) : IChartElement => {
        return {
            dimension : dim,
            items : [
                { id: idToItem }
            ],
        
        }
    }

    

 

    const onCreatedChart = (blobUrl : string, id : string) => {

        let layersToChange = [...layersToGenerate];

        for(let i = 0; layersToChange.length > i; i++){
            console.log("running for-loop...")
            if(layersToChange[i].id === id){
                
                setLayersToGenerate(layersToChange);

                const blob = new Blob([blobUrl], { type: 'image/svg+xml' });
                layersToChange[i].imageBlobUrl = URL.createObjectURL(blob);

                setnumOfChartGenerated(prev => prev+1);
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
        console.log(numOfChartGenerated)
        if(numOfChartGenerated===layersToGenerate.length){
           
            console.log("run")

        
                setLayers(layersToGenerate)
                setModalOpen(false);


            
        }
  
      
    }, [numOfChartGenerated])
    


    const onSelectPrevReport = (report : IPreviousReport) => {
        console.log(report.layers);
        setLayersToGenerate(report.layers);
    }

    /*reports.map((obj : IPreviousReport) => {
        console.log(obj.reportTitle+" "+obj.dateCreated);
    })*/

  return (
    <div>
        {
            (layersToGenerate.length === 0) ?
            (
                <>
        
        <b className='title-last-three'>Last three reports:</b>

        <table style={{width : "100%"}}>
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
                {
                    reports.sort(function(a,b){return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()}).map((obj : IPreviousReport, i) => (
                        <tr key={i}>
                            <td className='use-prev-cells'>{obj.reportTitle}</td>
                            <td className='use-prev-cells'>{obj.dateCreated.toString().slice(0,10)}</td>
                            <td className='use-prev-cells float-button-right'><Button onClick={() => onSelectPrevReport(obj)} primary icon={<IconArrowRight24/>}></Button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
            )
            :
            (
                <>              
                <p>Laster...</p>
               
                {
             
                    layersToGenerate.map((obj : ILayer, i) => (
                        <div key={i} style={{opacity : 0}}>
                            <ShowVisualization finishTrigger={onCreatedChart} selectedChart={obj.chartType} dataElementMock={makeIChartElement("dx", obj.dataElementId)} periodeMock={makeIChartElement("pe", obj.timePeriodId)} orgUnitMock={makeIChartElement("ou", obj.orgUnitId)} id={obj.id} />
                        </div>
                    ))
                }
                </>
    
            
            )
        
     

            }
    </div>
  )
}

function useContext(): { layers: any; setlayers: any; } {
    throw new Error('Function not implemented.');
}

