import React, {useState, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import Preview from '../../components/overview-components/preview-components/Preview';
import Summery from '../../components/overview-components/summery-components/Summery';
import { ILayer } from '../../interfaces/Layer';
import { Menu, MenuItem, Button } from "@dhis2/ui";
import { IconAdd24 } from "@dhis2/ui-icons"

import "./overview-styles/overview.css"


interface OverviewProps {
    layers : ILayer[],
    //swapIndex : (swapFirstId : string, swapSecondId : string ) => void;
    setLayers : any;
}

const Overview = ({layers, setLayers} : OverviewProps) => {

    const navigate = useNavigate();

    const [viewType, setViewType] = useState<string>("preview")


    const childRef = useRef();
 

    const changeView = (type : string) => {
        setViewType(type);
    }

  return (
    <div>

            
            <div className="menu">   

                <MenuItem style={{maxWidth : "200px"}} active={viewType === "summery"} label="Summery" onClick={() => changeView("summery")}/>
                <MenuItem active={viewType === "preview"} label="Preview" onClick={() => changeView("preview")} />
            </div>
        <hr/>

        <div className='main-container'>

        {
            {
            'summery': <Summery layers={layers} setLayers={setLayers}/>,
            'preview': <Preview layers={layers} reft={childRef}/>,
            }[viewType]
        }
       
       <div className='center-button-margin'>
        <Button secondary onClick={() => navigate("/add-chart")} icon={<IconAdd24/>}>
                Add new chart/text
        </Button>
       </div>

       <Button onClick={() => (childRef.current as any).getAlert()}>
            Share
       </Button>
       
        

        
        </div>
    </div>
  )
}

export default Overview

