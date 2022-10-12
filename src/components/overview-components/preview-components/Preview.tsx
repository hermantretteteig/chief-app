import React, {useImperativeHandle, forwardRef, useRef} from 'react'
import { ILayer } from '../../../interfaces/Layer'
import html2canvas from 'html2canvas';
import "./preview-styles.css";

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
        <div id="capturereport" > 
            {
                layers.map((layer : ILayer, i) => (
                    <div key={i}>
                    {
                        (layer.imageBlobUrl === null) ?
                        (
                            <div>
                                
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



