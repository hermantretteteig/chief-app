import React, {useState} from 'react'
import { ILayer } from '../../../interfaces/Layer'
import "./summery-layer-styles.css"
import { IconMore24 } from "@dhis2/ui-icons";

import MoreOptions from './MoreOptions';
import {convertText, convertToIcon} from "./ConvertHelper";

interface SummerLayerProps {
    layer : ILayer,
    index : number
}

const SummeryLayer = ({layer, index} : SummerLayerProps) => {

    const [showMore, setShowMore] = useState<boolean>(!false);
    
  return (
    <div className='layer-container'>
        <div className='layer-innter-container'>
            <div>
                <span className='main-title'>
                    <span>
                        {layer.mainTitle}
                    </span>
                </span>
                <div className='under-titles'>
                    {
                        (layer.imageBlobUrl === "") ?
                        (
                            <span>{layer.customText}</span>
                        )
                        :
                        (
                            <>
                            {layer.timePeriodeName}&nbsp;&nbsp;|&nbsp;&nbsp;{layer.chartType.toLowerCase()}&nbsp;
                            <span>{convertToIcon(layer.chartType)} </span>
                            <br/>
                            {layer.orgUnitName}
                            </>
                        )
                    }
                    
                </div>
                {/*<div className='show-more-button'>
                    <Button small onClick={() => setShowMore(!showMore)}>{(showMore) ? "show less" : "show more" }</Button>
                  
  </div>*/}
               
            </div>
            

    
           
      
            
        </div>

        {/*
            (showMore) ?
            (
           <div>
        
                <table  className='more-info'>
                    <tr >
                        <td>
                            Organization unit:
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Data element:
                        </td>
                        <td>
                            {layer.dataElement}
                        </td>
                    </tr>
                 
                </table>
   
                </div>
            )
            :
            (
                <span></span>
            )
            */}
       
        

    </div>
  )
}

export default SummeryLayer