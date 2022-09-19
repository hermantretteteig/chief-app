import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Preview from '../../components/overview-components/preview-components/Preview';
import Summery from '../../components/overview-components/summery-components/Summery';
import { ILayer } from '../../interfaces/Layer';
import { Menu, MenuItem } from "@dhis2/ui"
import "./overview-styles/overview.css"

interface OverviewProps {
    layers : ILayer[],
    setLayers : any;
}

const Overview = ({layers, setLayers} : OverviewProps) => {

    const [viewType, setViewType] = useState<string>("summery")

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
            'preview': <Preview layers={layers}/>,
            }[viewType]
        }
       
        <Link to={"/add-chart"}>Add chart</Link>

        
        </div>
    </div>
  )
}

export default Overview