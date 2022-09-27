import React, {useImperativeHandle, forwardRef, useRef} from 'react'
import { ILayer } from '../../../interfaces/Layer'
import html2canvas from 'html2canvas';

interface PreviewProps{
	layers : ILayer[],
    reft : any
}

const Preview = ({layers, reft} : PreviewProps) => {




    


    useImperativeHandle(reft, () => ({

        getAlert() {
            convertDOMtoPNG()
        }
    
      }));
    

  

    const convertDOMtoPNG = () => {


        var container: any = document.getElementById("capturereport"); /* full page */
                html2canvas(container, { allowTaint: true, useCORS : true }).then(function (canvas) {

                    var link = document.createElement("a");
                    document.body.appendChild(link);
                    link.download = "html_image.jpg";
                    link.href = canvas.toDataURL();
                    link.target = '_blank';
                    link.click();
                });
        
        /*html2canvas(document.body).then(function(canvas) {
            const img = document.body.appendChild(canvas);
            console.log(img);

        });*/
      
    }


  return (
    <div>
        <div id="capturereport" style={{maxWidth : "400px"}}> 
        <span>hei</span>   
        <span>Last month has not been tracked due to technial issus.</span>
        

        {
            layers.map((layer : ILayer, i) => (
                <div key={i}>
                    <span>{layer.mainTitle}</span>
                    <img style={{maxWidth : "450px", textAlign : "center"}} src={"./chart.svg"}/>
                </div>
            ))
        }
           </div>
           </div>
       

 
  )
}

export default Preview



