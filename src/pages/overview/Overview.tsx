import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Preview from '../../components/overview-components/preview-components/Preview';
import Summery from '../../components/overview-components/summery-components/Summery';
import { ILayer } from '../../interfaces/Layer';
import { Menu, MenuItem, Button } from "@dhis2/ui";
import { IconAdd24 } from "@dhis2/ui-icons"
import ReportOptions from './ReportOptions'
import DefaultReport from './DefaultReport';


import "./overview-styles/overview.css"
import { useDataQuery } from '@dhis2/app-runtime';


interface OverviewProps {
    layers: ILayer[],
    //swapIndex : (swapFirstId : string, swapSecondId : string ) => void;
    setLayers: any,
    report: string,
    userId : string,
    reportType: (report: string) => void
}



const Overview = ({ layers, setLayers, reportType, report, userId}: OverviewProps) => {
    const [modalOpen, setModalOpen] = useState(true)
    const navigate = useNavigate();



    const [viewType, setViewType] = useState<string>("summery")

    const childRef = useRef();

    const downloadImage = () => {
        setViewType("preview");
        setTimeout(() => {
            (childRef.current as any).getAlert();
        }, 150);
    }

    const changeView = (type: string) => {
        setViewType(type);
    }


    return (
        <div>
            <div>
            {modalOpen && report === '' && 
                <ReportOptions setModalOpen={setModalOpen} userId={userId} setSelectedType={setModalOpen} selectedType={modalOpen} setReportType={reportType} selectedReport={report}/>
            }
            </div>
            <div className="menu">
                <MenuItem style={{ maxWidth: "200px" }} active={viewType === "summery"} label="Summery" onClick={() => changeView("summery")} />
                <MenuItem active={viewType === "preview"} label="Preview" onClick={() => changeView("preview")} />
                </div>

            <hr />

            <div className='main-container'>

                {
                    {
                        'summery': <Summery layers={layers} setLayers={setLayers} />,
                        'preview': <Preview layers={layers} reft={childRef} />,
                    }[viewType]
                }

                <div className='center-button-margin'>
                    <Button primary onClick={() => navigate("/add-chart")} icon={<IconAdd24 />}>
                        Add new chart/text
                    </Button>

                </div>


                <div className="bottom-button-container">
                    <div className="bottom-flex-container">
                        <div className="button-bottom">
                            <Button large={true} primary onClick={downloadImage}>
                                Share report!
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Overview

