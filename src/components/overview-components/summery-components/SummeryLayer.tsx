import React, {useState} from 'react'
import { ILayer } from '../../../interfaces/Layer'
import "./summery-layer-styles.css"
import { IconMore24 } from "@dhis2/ui-icons";
import { DropdownButton, Button } from "@dhis2/ui"
import MoreOptions from './MoreOptions';

interface SummerLayerProps {
    layer : ILayer
}

const SummeryLayer = ({layer} : SummerLayerProps) => {

    const [showMore, setShowMore] = useState<boolean>(false);




  return (
    <div className='layer-container'>
        <div className='layer-innter-container'>
            <span>
                <b>{layer.mainTitle}</b>
                <span style={{fontSize : "13px"}}><br/>{layer.timePeriod}&nbsp;&nbsp;|&nbsp;&nbsp;{layer.chartType} <a href="javascript:void(f1())" onClick={() => setShowMore(!showMore)}><br/>({(showMore) ? "show less" : "show more" })</a></span>
            </span>
            
            <DropdownButton
                icon={<IconMore24/>}
                component={<MoreOptions/>} 
                name="Icon small button"
                value="default"/>
      
            
        </div>

        {
            (showMore) ?
            (
           <div>
                 <hr/>
                <table>
                    <tr>
                        <td>
                            <b>Organization unit:</b>
                        </td>
                        <td>
                            {layer.orgUnit}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <b>Data element:</b>
                        </td>
                        <td>
                            {layer.dataElement}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <b>Time periode:</b>
                        </td>
                        <td>
                            {layer.timePeriod}
                        </td>
                    </tr>
                </table>
   
                </div>
            )
            :
            (
                <span></span>
            )
        }
       
        

    </div>
  )
}

export default SummeryLayer