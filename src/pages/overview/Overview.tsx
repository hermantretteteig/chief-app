import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Preview from '../../components/overview-components/preview-components/Preview';
import Summery from '../../components/overview-components/summery-components/Summery';
import { ILayer } from '../../interfaces/Layer';
import { Menu, MenuItem, Modal, ButtonStrip, ModalTitle, Input, InputField, ModalActions, ModalContent, Button } from "@dhis2/ui";
import { IconAdd24, IconBlock24, IconDownload24, IconFileDocument24 } from "@dhis2/ui-icons"
import ReportOptions from '../../components/report-options/ReportOptions'
import "./overview-styles/overview.css"
import { useDataQuery } from '@dhis2/app-runtime';
import { IPreviousReport } from '../../interfaces/PreviousReport';
import HelpModul from './HelpModul';
import ChangeTitle from '../../components/add-chart-components/charts/ChangeTitle';
import SideBar from '../../components/standard-reports/SideBar';
import { useLayerContext } from '../../contexts/LayerContext';
import { usePreviousContext } from '../../contexts/PreviousContext';


interface OverviewProps {
    layers: ILayer[],
    //swapIndex : (swapFirstId : string, swapSecondId : string ) => void;
    setLayers: any,
    report: string,
    userId: string,
    reportType: (report: string) => void
}

const lastUsedFromDataStore = (userId : string) => {
    return {
        results: {
            resource: 'dataStore/chief-app/'+userId,
            params: {
                fields: ['dataViewOrganisationUnits'],
            },
        }
    }
}


const Overview = ({ layers, setLayers, reportType, report, userId }: OverviewProps) => {

    
    const { loading : loadingLastUsed, error : errorLastUsed, data : dataPreviousReport } = useDataQuery(lastUsedFromDataStore(userId))
    


    const { setPreviousReports } = usePreviousContext();

    const [isUpdatingLastUsed, setisUpdatingLastUsed] = useState(true)



    const [shareModal, setshareModal] = useState<boolean>(false)
    const [method, setmethod] = useState("update");

    const [finishDownload, setfinishDownload] = useState(false)

    const [reportTitleCustom, setReportTitleCustom] = useState("");
    const [hideForExport, sethideForExport] = useState(false)

    const [helpModalOpen, setHelpModalOpen] = useState(false)
    const [openSideBar, setOpenSideBar] = useState(false)
    const [reportName, setReportName] = useState("")

    const [innerHeightForMenu, setInnerHeightForMenu] = useState(400)

    const navigate = useNavigate();


    const createNewReport = () => {
        location.reload();
    }


    const onShareClick = () => {
        sethideForExport(true);
        setshareModal(true);
    }

    const onChangeTitle = (e: any) => {
        setReportTitleCustom(e.value);
    }


    const childRef = useRef();

    const downloadImage = () => {
        setTimeout(() => {
            (childRef.current as any).getAlert();
        }, 150);
        setfinishDownload(true);
    }

    const changeStatus = () => {
        setHelpModalOpen(true);
    }
    const changeSideBar = () => {
        if (openSideBar == true) {
            setOpenSideBar(false)
        }
        else {
            setOpenSideBar(true)
        }
    }

    const onChangeStandardAndSetReportTitleCustom = (reportStandardName : string) => {
        setOpenSideBar(false);
        console.log(reportStandardName);
        setReportTitleCustom(reportStandardName);
    }


    return (
            <div>
                <div className='top-nav-bar'  style={{
                    position : "fixed", 
                    width : "100vw", 
                    height : "46px",
                    zIndex : "1"
                }}>

                    <div className='button-open-menu-container'>
                        <Button loading={loadingLastUsed} className='openbtn' primary icon={<IconFileDocument24/>} onClick={changeSideBar}>Standard reports</Button>         
                    </div>
                </div>
                
            <main 
                style={{
                    display: 'flex',
                    height: '100%',
                    
                }}
            >
                {openSideBar && (<><aside
                    style={{                   
                        position: "fixed",
                        height: "100vh",
                        marginTop : "47px",
                        maxWidth: "190px",
                        backgroundColor: "#f2f2f2",
                        borderRight: openSideBar ? ('1px solid grey') : (""),
                    }}
                >
                    <div className="menu">
                        <div className='sidebar'>
                            
                            <SideBar dataLastUsed={(dataPreviousReport?.results as any).reports as any as IPreviousReport[]} userId={userId} open={openSideBar} setOpen={setOpenSideBar} onChangeStandardAndSetReportTitleCustom={onChangeStandardAndSetReportTitleCustom}/>
                        </div>
                    </div>
                </aside>
                </>)}
                <section className="section-style" style={{marginTop : "50px"}}>
                    <div className='main-container'>

                        <div style={{display : (layers.length === 0) ? "" : "none"}}>
                            <div className="nothing-added-yet">
                                Nothing added yet, click "Add new chart/text" below,<br/> or find standards by clicking "Standrd report" above.
                            </div>
                        </div>

                        <div className='center-button-margin'>
                            <Button primary onClick={() => navigate("/add-chart")} icon={<IconAdd24 />}>
                                Add new chart/text
                            </Button>
                        </div>

                        {
                            (!loadingLastUsed) && <Preview setisUpdatingLastUsed={setisUpdatingLastUsed} dataPreviousReport={(dataPreviousReport?.results as any).reports as any as IPreviousReport[]} hideForExport={hideForExport} reportTitleCustom={reportTitleCustom} userId={userId} layers={layers} reference={childRef} />
                        }
                       
                        <div className="bottom-button-container">
                            <div className="bottom-flex-container">
                                <div className="help-button-ove">

                                </div>
                                <div className="share-button-ove">
                                    <Button disabled={layers.length === 0} large={true} primary onClick={onShareClick}>
                                        Share report!
                                    </Button>
                                </div>
                                <div className="help-button-ove">
                                    <Button onClick={changeStatus}>
                                        Help
                                    </Button>
                                </div>
                            </div>

                        </div>
                        <HelpModul open={helpModalOpen} setOpen={setHelpModalOpen} />

                        {shareModal &&
                            <Modal small>
                                <div className='close-button-container'>

                                </div>

                                {(finishDownload) ?
                                    <div style={{ textAlign: "center" }}>
                                        {
                                            (isUpdatingLastUsed)
                                            ?
                                            (
                                                <h2 className="report-is-ready">Your report is beeing downloaded..</h2>
                                            )
                                            :
                                            (
                                                <h2 className="report-is-ready" style={{color : "green"}}>Your report is ready!</h2>
                                            )
                                        }
                                         <span>How to save:</span>
                                        <img className='simple-instruction' src="instructions-simple.png" />
                                        <hr />
                                        <br />

                                        <Button onClick={createNewReport} icon={<IconAdd24 />} small>Create new report</Button>
                                    </div>
                                    :
                                    <div>
                                        <div className='close-button-container'>
                                            <span className='share-modal-main-title'>
                                                Type in a title for the report
                                            </span>
                                            <div className='close-button-inner-container'>
                                                <Button onClick={() => {setshareModal(false), sethideForExport(false)}} destructive icon={<IconBlock24 />} small></Button>
                                            </div>
                                        </div>


                                        <ModalContent>
                                            <InputField initialFocus value={reportTitleCustom} onChange={onChangeTitle} label="Report title:" />
                                            
                                            <div className='button-download-container'>
                                                <Button disabled={reportTitleCustom.length < 2} primary large icon={<IconDownload24 />} onClick={downloadImage}>
                                                    Download
                                                </Button>
                                            </div>

                                        </ModalContent>
                                    </div>}




                            </Modal>}

                    </div>
                </section>
            </main>
        </div>
    )
}

export default Overview

