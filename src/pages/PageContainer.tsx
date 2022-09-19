import React, {useState} from 'react'
import AddChart from './add-chart/AddChart'
import { ILayer } from '../interfaces/Layer'
import Overview from './overview/Overview'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'


const PageContainer = () => {
    const [layers, setLayers] = useState<ILayer[]>([]);

    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Overview layers={layers} setLayers={setLayers}/>}/>
                <Route path="/add-chart" element={<AddChart setLayers={layers}/>} />
            </Routes>
        </BrowserRouter>
      

        
      
    </div>
    )
}

export default PageContainer

