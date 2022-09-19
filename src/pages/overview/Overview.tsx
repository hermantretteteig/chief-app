import React from 'react'
import { Link } from 'react-router-dom';
import Preview from '../../components/overview-components/preview-components/Preview';
import Summery from '../../components/overview-components/summery-components/Summery';
import { ILayer } from '../../interfaces/Layer';

interface OverviewProps {
    layers : ILayer[],
    setLayers : any;
}

const Overview = ({layers, setLayers} : OverviewProps) => {
  return (
    <div>
        <Summery layers={layers} setLayers={setLayers}/>
        <Preview layers={layers}/>
       
        <Link to={"/add-chart"}>Add chart</Link>

        

    </div>
  )
}

export default Overview