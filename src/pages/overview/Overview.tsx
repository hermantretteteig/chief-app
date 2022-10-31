import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Preview from '../../components/overview-components/preview-components/Preview';
import Summery from '../../components/overview-components/summery-components/Summery';
import { ILayer } from '../../interfaces/Layer';
import { Menu, MenuItem, Modal, ButtonStrip, ModalTitle, InputField, ModalActions, ModalContent, Button } from "@dhis2/ui";
import { IconAdd24, IconDownload24 } from "@dhis2/ui-icons"
import ReportOptions from '../../components/report-options/ReportOptions'
import "./overview-styles/overview.css"
import { useDataQuery } from '@dhis2/app-runtime';
import { IPreviousReport } from '../../interfaces/PreviousReport';
import HelpModul from './HelpModul';
import ChangeTitle from '../../components/add-chart-components/charts/ChangeTitle';


interface OverviewProps {
    layers: ILayer[],
    //swapIndex : (swapFirstId : string, swapSecondId : string ) => void;
    setLayers: any,
    report: string,
    userId : string,
    reportType: (report: string) => void
}

const Overview = ({ layers, setLayers, reportType, report, userId}: OverviewProps) => {


    const [shareModal, setshareModal] = useState<boolean>(false)
    const [method, setmethod] = useState("update");
    const [previouData, setpreviouData] = useState<IPreviousReport>();
    const [finishDownload, setfinishDownload] = useState(false)

    const [title, settitle] = useState("");
    const [helpModalOpen, setHelpModalOpen] = useState(false)

    const navigate = useNavigate();


    const onShareClick = () => {
        setshareModal(true);
    }

    const onChangeTitle = (e : any) => {
        settitle(e.value);
    }


    const [viewType, setViewType] = useState<string>("summery")

    const childRef = useRef();

    const downloadImage = () => {
        setViewType("preview");
        setTimeout(() => {
            (childRef.current as any).getAlert();
        }, 150);
        setfinishDownload(true);
    }

    const changeView = (type: string) => {
        setViewType(type);
    }
    const changeStatus = () => {
        setHelpModalOpen(true);
    }


    return (
        <div>
            <div>
            
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
                        'preview': <Preview reportTitle={title} userId={userId} layers={layers} reference={childRef} />,
                    }[viewType]
                }

                <div className='center-button-margin' >
                    <Button primary onClick={() => navigate("/add-chart")} icon={<IconAdd24 />}>
                        Add new chart/text
                    </Button>

                </div>


                <div className="bottom-button-container">
                    <div className="bottom-flex-container">
                        <div className="button-bottom">
                            <Button large={true} primary onClick={onShareClick}>
                                Share report!
                            </Button>
                        </div>
                        <div>
                            <Button className="button-bottom2" onClick={changeStatus}>
                                Help
                            </Button>
                        </div>
                        <HelpModul open={helpModalOpen} setOpen={setHelpModalOpen}/>
                    </div>

                </div>

                {
                    shareModal &&
                
                    <Modal small>
                        {
                            (finishDownload) ?
                                <h2 className="report-is-ready">Your report is downloaded!</h2>
                            :
                            <div>
                             <ModalTitle>
                                Type in a title for the report
                            </ModalTitle>

                            <ModalContent>
                                <InputField value={title} onChange={onChangeTitle} label="Report title:"/>
                           

                            <div className='button-download-container'>
                                <Button disabled={title.length < 2} primary large icon={<IconDownload24/>} secondary onClick={downloadImage}>
                                    Download
                                </Button>
                            </div>

                            </ModalContent>
                            </div>
                        }

                           

                   
                    </Modal>
                }
            </div>
        </div>
    )
}

export default Overview

