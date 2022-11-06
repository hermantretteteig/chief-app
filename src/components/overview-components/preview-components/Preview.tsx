import React, {useImperativeHandle, forwardRef, useRef} from 'react'
import { ILayer } from '../../../interfaces/Layer'
import html2canvas from 'html2canvas';
import "./preview-styles.css";
import { PreviewText } from '../../add-chart-components/text/PreviewText';
import { usePreviousContext } from '../../../contexts/PreviousContext';
import { IPreviousReport } from '../../../interfaces/PreviousReport';
import { useDataMutation } from '@dhis2/app-runtime';

const myMutation = (type : string, userId : string) => {
    return {

        resource: 'dataStore/chief-app/'+userId,
        type: type,
        
        //id : userId,
        partial : false,
        //params : {},
        data: (reports : IPreviousReport[]) => (
            reports

//reports as []
        )
    }
}



interface PreviewProps{
	layers : ILayer[],
    reference : any,
    userId : string,
    reportTitle : string
}

const updateOrCreate = (previousReports : IPreviousReport[]) => {
    console.log(previousReports)
    if(previousReports.length === 0){
        return "create"
    }
    return "update"
}

const Preview = ({layers, reference: ref, userId, reportTitle} : PreviewProps) => {

    const { previousReports, setPreviousReports } = usePreviousContext();
    const [mutate, { called, loading, error, data }] = useDataMutation(myMutation(updateOrCreate(previousReports), userId) as any)

    useImperativeHandle(ref, () => ({
        getAlert() {
            convertDOMtoPNG()
        }
      }));
    

  

    const convertDOMtoPNG = async () => {
        console.log(previousReports)

        let _previousReports = [...previousReports];
        console.log(indexToUpdateInPreviousReport());

        const addReport: IPreviousReport = {
            dateCreated : new Date(),
            reportTitle : reportTitle,
            layers : layers
        }

        if(_previousReports.length < 3){
            console.log("len is smaler than tree, need to add.")
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
        await mutate({reports : _previousReports
        }
              )

        var container: any = document.getElementById("capturereport"); /* full page */
                html2canvas(container, { allowTaint: true, useCORS : true }).then(function (canvas) {

                    var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = (reportTitle.trim().replace(/ /g, '-')+".jpg");
                    link.href = canvas.toDataURL();
                    link.target = '_blank';
                    link.click();
                });
        
        /*html2canvas(document.body).then(function(canvas) {
            const img = document.body.appendChild(canvas);
            console.log(img);

        });*/
      
    }


    const indexToUpdateInPreviousReport = () : number => {
        let oldest = new Date();
        let indexToReplace: number = -1;

        


        previousReports.forEach((obj : IPreviousReport, index) => {

            if(new Date(obj.dateCreated) < oldest){
                oldest = new Date(obj.dateCreated);
                indexToReplace = index;
            }
        })
        return indexToReplace;
    }


  return (
    <div className='report-container'>
        <div id="capturereport"> 
            <h3 style={{textAlign : "center"}}>{reportTitle}</h3>
            {
                layers.map((layer : ILayer, i) => (
                    <div key={i}>
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
                    </div>  
                ))
            }
        </div>
        <hr/>    
    </div>
       

 
  )
}

export default Preview



