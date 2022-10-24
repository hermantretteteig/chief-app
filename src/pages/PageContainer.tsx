import React, { useState } from 'react'
import AddChart from './add-chart/AddChart'
import { ILayer } from '../interfaces/Layer'
import Overview from './overview/Overview'
import { BrowserRouter, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { LayerContext } from '../contexts/LayerContext'
import { fake_layers } from '../components/overview-components/summery-components/FakeData'
import Mainpage from '../Mainpage'
import DefaultReport from '../pages/overview/DefaultReport'
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";

interface IOrgUnits {
    id : string,
    name : string
}

const meQuery = {
    results: {
        resource: 'me',
        params: {
            fields: ['dataViewOrganisationUnits','id'],
        },
    },
}


interface pagecontainerprops {
    layers: ILayer[],
    setLayers: (layers: ILayer[]) => void
}

const PageContainer = () => {
    const [layers, setLayers] = useState<ILayer[]>([/*fake_layers*/]);
    const [reportType, setreportType] = useState('')

    const { loading : loadingMe, error : errorMe, data : dataMe, refetch : refetchMe } = useDataQuery(meQuery)

    console.log(layers);
    
    if (loadingMe) {
        return <span>Loading...</span>
    }

 
    
    else{

        console.log((dataMe?.results as any).id as string);
   /*      }

    if(lastUsedData !== null){
        console.log(lastUsedData);
    
    */



       // setusersOrgUnits(orgUnits);
   
        return (
            <div>
                <LayerContext.Provider value={{layers, setLayers}}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Overview userId={(dataMe?.results as any).id as string} layers={layers} setLayers={setLayers} reportType={setreportType} report={reportType}/>}/>
                            <Route path="/add-chart" element={<AddChart layers={layers} setLayers={setLayers}/>} />
                            <Route path="/main-page" element={<Mainpage/>}/>
                                
                            {/*} <Route path="/" element={<Mainpage/>}/> */}
                        </Routes>
                    </Router>
                </LayerContext.Provider>
            </div>
        )
    }   
}

export default PageContainer

