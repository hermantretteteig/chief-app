import React, { useState } from 'react'
import AddChart from './add-chart/AddChart'
import { ILayer } from '../interfaces/Layer'
import Overview from './overview/Overview'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { LayerContext } from '../contexts/LayerContext'
import { fake_layers } from '../components/overview-components/summery-components/FakeData'
import Mainpage from '../Mainpage'
import DefaultReport from '../pages/overview/DefaultReport'

interface pagecontainerprops {
    layers: ILayer[],
    setLayers: (layers: ILayer[]) => void
}

const PageContainer = () => {
    const [layers, setLayers] = useState<ILayer[]>([/*fake_layers*/]);
    const [reportType, setreportType] = useState('')
    return (
        <div>
            <div>
                <LayerContext.Provider value={{ layers, setLayers }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Overview layers={layers} setLayers={setLayers} reportType={setreportType} report={reportType}/>} />
                            <Route path="/add-chart" element={<AddChart layers={layers} setLayers={setLayers} />} />
                            <Route path="/main-page" element={<Mainpage />} />

                            {/*} <Route path="/" element={<Mainpage/>}/> */}
                        </Routes>
                    </BrowserRouter>
                </LayerContext.Provider>
            </div>

        </div>
    )
}

export default PageContainer

