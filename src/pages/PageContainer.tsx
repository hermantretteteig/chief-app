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

const myQuery = {
    results: {
        resource: 'me',
        params: {
            
            fields: ['dataViewOrganisationUnits'],
        },
    },
}

const orgUntitsQuery = {
    results: {
        resource: 'organisationUnits',
        params: {
            fields: ['dataViewOrganisationUnits'],
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

    const [usersOrgUnits, setusersOrgUnits] = useState<IOrgUnits[]>([]);

    const { loading : loadingMe, error : errorMe, data : dataMe, refetch : refetchMe } = useDataQuery(myQuery)
    const { loading : loadingOrgUnits, error : errorOrgUnits, data : dataOrgUnits, refetch : refetchOrgUnits } = useDataQuery(myQuery)
  
    if (loadingMe || loadingOrgUnits) {
        return <span>Loading...</span>
    }
    
    else{
        let orgUnits: string[] = [];

        ((dataMe?.results as any).dataViewOrganisationUnits as any[]).forEach((obj : any) => {
            orgUnits.push(obj.id)
        });

       // setusersOrgUnits(orgUnits);
        console.log(orgUnits);

        return (
            <div>
                <LayerContext.Provider value={{layers, setLayers}}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Overview layers={layers} setLayers={setLayers} reportType={setreportType} report={reportType}/>}/>
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

