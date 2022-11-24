import React, { useState } from 'react'
import AddChart from './add-chart/AddChart'
import { ILayer } from '../interfaces/Layer'
import Overview from './overview/Overview'
import { BrowserRouter, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { LayerContext } from '../contexts/LayerContext'
import Mainpage from '../Mainpage'
import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import { PreviousContext } from '../contexts/PreviousContext'
import { IPreviousReport } from "../interfaces/PreviousReport"
import ReportOptions from '../components/report-options/ReportOptions'

interface IOrgUnits {
    id : string,
    name : string
}

const meQuery = {
    results: {
        resource: 'me',
        params: {
            fields: ['organisationUnits[id,name]','id'],
        },
    },
}


interface pagecontainerprops {
    layers: ILayer[],
    setLayers: (layers: ILayer[]) => void
}

const PageContainer = () => {
    const [layers, setLayers] = useState<ILayer[]>([]);
    const [previousReports, setPreviousReports] = useState<IPreviousReport[]>([])

    const [reportType, setreportType] = useState('')

    const { loading : loadingMe, error : errorMe, data : dataMe, refetch : refetchMe } = useDataQuery(meQuery)
    const [modalOpen, setModalOpen] = useState(true)

    console.log(layers);
    
    if (loadingMe) {
        return <h2 style={{textAlign : "center"}}>Loading...</h2>
    }

 
    
    else{
        return (
            <div>
                <LayerContext.Provider value={{layers, setLayers}}>
                    <PreviousContext.Provider value={{previousReports, setPreviousReports}}>
                        {/*modalOpen ?
                            <ReportOptions setModal={setModalOpen} userId={(dataMe?.results as any).id}/>
                        :*/}
                        <Router>
                            <Routes>
                                <Route path="/" element={<Overview userId={(dataMe?.results as any).id as string} layers={layers} setLayers={setLayers} reportType={setreportType} report={reportType}/>}/>
                                <Route path="/add-chart" element={<AddChart orgUnits={(dataMe?.results as any).organisationUnits} layers={layers} setLayers={setLayers}/>} />
                                <Route path="/main-page" element={<Mainpage/>}/>
                            </Routes>
                        </Router>
                        
                       
                    </PreviousContext.Provider>
                </LayerContext.Provider>
            </div>
        )
    }   
}

export default PageContainer

