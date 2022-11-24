import React, {useImperativeHandle, forwardRef, useState} from 'react'
import { ILayer } from '../../../interfaces/Layer'
import html2canvas from 'html2canvas';
import "./preview-styles.css";
import { PreviewText } from '../../add-chart-components/text/PreviewText';
import { usePreviousContext } from '../../../contexts/PreviousContext';
import { IPreviousReport } from '../../../interfaces/PreviousReport';
import { useDataMutation } from '@dhis2/app-runtime';
import MoreOptions from '../summery-components/MoreOptions';
import { DropdownButton, Button } from "@dhis2/ui"

const myMutation = (type : string, userId : string) => {
    return {
        resource: 'dataStore/chief-app/'+userId,
        type: type,
        partial : false,
        //params : {},
        data: (reports : IPreviousReport[]) => (
            reports
        )
    }
}



interface PreviewProps{
	layers : ILayer[],
    reference : any,
    userId : string,
    hideForExport : boolean,
    reportTitleCustom : string, 
    dataPreviousReport : IPreviousReport[],
    setisUpdatingLastUsed : (val : boolean) => void;
}

const updateOrCreate = (previousReports : IPreviousReport[]) => {
    console.log(previousReports);
    if(previousReports.length === 0){
        console.log("create")
        return "create"
    }
    console.log("update")
    return "update"
}

const Preview = ({layers, reference: ref, userId, reportTitleCustom, hideForExport, dataPreviousReport, setisUpdatingLastUsed} : PreviewProps) => {

    //const { previousReports } = usePreviousContext();
    const [mutate, { called, loading, error, data }] = useDataMutation(myMutation(updateOrCreate(dataPreviousReport), userId) as any)
    const [key, setClicked] = useState(0)

    useImperativeHandle(ref, () => ({
        getAlert() {
            convertDOMtoPNG()
        }
      }));



    //used to reload button, so it
    const increaseKey = () => {
        setClicked(key+1)
    }


    const convertDOMtoPNG = async () => {
        setisUpdatingLastUsed(true);
        console.log(dataPreviousReport)

        let _previousReports = [...dataPreviousReport];
        console.log(indexToUpdateInPreviousReport());

        const addReport: IPreviousReport = {
            dateCreated : new Date(),
            reportTitle : reportTitleCustom,
            layers : layers
        }

        if(_previousReports.length < 3){
            _previousReports.push(addReport)
        }
        else{
            const indexToUpdate = indexToUpdateInPreviousReport();
            _previousReports[indexToUpdate] = addReport;
        }

        //previousReports[indexToUpdate].dateCreated = new Date();
        //previousReports[indexToUpdate].reportTitle = "A report";
        //previousReports[indexToUpdate].layers = layers;
        //const newMut = myMutation("update", addReport);
        
        await mutate({reports : _previousReports})

        var container: any = document.getElementById("capturereport"); /* full page */
                html2canvas(container, { allowTaint: true, useCORS : true }).then(function (canvas) {
                    var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = (reportTitleCustom.trim().replace(/ /g, '-')+".jpg");
                    link.href = canvas.toDataURL();
                    link.target = '_blank';
                    link.click();
                });

        setisUpdatingLastUsed(false);
        
        /*html2canvas(document.body).then(function(canvas) {
            const img = document.body.appendChild(canvas);
            console.log(img);

        });*/
      
    }


    const indexToUpdateInPreviousReport = () : number => {
        let oldest = new Date();
        let indexToReplace: number = -1;

        


        dataPreviousReport.forEach((obj : IPreviousReport, index) => {

            if(new Date(obj.dateCreated) < oldest){
                oldest = new Date(obj.dateCreated);
                indexToReplace = index;
            }
        })
        return indexToReplace;
    }


  return (
    <div id="capturereport" className='report-container'>
        <div> 
            <h3 style={{textAlign : "center"}}>{reportTitleCustom}</h3>
            {
                layers.map((layer : ILayer, i) => (
                    <div key={i} className="flex-preview">
                        <>
                        {
                            (layer.imageBlobUrl === "") ?
                                (
                                    <div className='preview-style'>
                                        <PreviewText mainTitle={layer.mainTitle} customText={layer.customText as string} theme={layer.theme as string} />
                                    </div>
                                )
                                :
                                (
                                    <div className="chart-container">
                                        <p className="chart-title">{layer.mainTitle}</p>
                                        <img className='chart-size' src={layer.imageBlobUrl}/>
                                    </div>
                                )
                        }
                        </>
                        {
                            (hideForExport === true) ?
                            (
                                <div></div>
                            )
                            :
                            (
                                <div className='button-item'>
                                    <DropdownButton
                                        id={"layer-btn-"+i}
                                        key={key}
                                        component={<MoreOptions layerName={layer.mainTitle} increaseKey={increaseKey} index={i}/>} 
                                        name="Icon small button"
                                        value="default"
                                        >options
                                    </DropdownButton>
                                </div>
                            )
                        }
                    </div>  
                ))
            }
        </div>
       
    </div>
       

 
  )
}

export default Preview



