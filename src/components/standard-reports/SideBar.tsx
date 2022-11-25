import { Menu, MenuItem, Modal } from '@dhis2/ui';
import React, { useState, useEffect } from 'react'
import { Button } from '@dhis2-ui/button'
import { IconDelete24, IconArchive24 } from "@dhis2/ui-icons"
import { UsePrevious } from '../add-chart-components/use-previous/UsePrevious';
import { IPreviousReport } from '../../interfaces/PreviousReport';
import { ILayer } from '../../interfaces/Layer';
import { allStandard } from './config-standard';
import { IStandard } from '../../interfaces/Standard';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { useLayerContext } from '../../contexts/LayerContext';
import { useDataQuery } from '@dhis2/app-runtime';
import "./side-bar-styles.css"  

interface sidebarProps {
    open: boolean,
    setOpen: (open: boolean) => void;
    onChangeStandardAndSetReportTitleCustom: (customReportName : string) => void,
    userId : string,
    dataLastUsed : any;
}

const SideBar = ({ open, setOpen, onChangeStandardAndSetReportTitleCustom, dataLastUsed, userId }: sidebarProps) => {

    const {setLayers} = useLayerContext()

    const onLastUsedFinished = () => {
        console.log("last used is finished loading");
        onChangeStandardAndSetReportTitleCustom(lastUsedReportTitle)
        setLastUsedModal(false); 
    }

    const onLoadingFinished = () => {
        console.log("loading standard is finish");
        onChangeStandardAndSetReportTitleCustom(new_reports[0].reportTitle + " report")
        setLoadingModal(false);
    }

    const [loadingModal, setLoadingModal] = useState(false)
    const [lastUsedModal, setLastUsedModal] = useState(false)

    const [new_reports, setnew_reports] = useState<IPreviousReport[]>([])

    const [lastUsedReportTitle, setLastUsedReportTitle] = useState("");

    const emptyLayers = () => {
        setLayers([])
        onChangeStandardAndSetReportTitleCustom("")
    }

    const generateReport = (stanReport : IStandard) => {
        setLoadingModal(true);



        const new_reports: IPreviousReport[] = [{
            dateCreated : new Date(),
            layers : stanReport.layers,
            reportTitle : stanReport.standardName
        }]
        
        setnew_reports(new_reports);
        
    }

    return (
        <div>
            <div className='sidebar'>
                {open && 
                 
                        <div>
                            
                                <hr style={{margin : "0px"}}/>
                            <Menu>
                                {
                                    allStandard.map((obj : IStandard, i) => (
                                    
                                        <MenuItem key={i} label={obj.standardName} onClick={() => generateReport(obj)} />
                                   
                                    ))
                                }
                            </Menu>
                            <hr style={{margin : "0px"}}/>
                            <Menu>
                                <MenuItem label="Last generated" onClick={() => setLastUsedModal(true)} icon={<IconArchive24/>}/>
                           
                            </Menu>
                               
                                
                          
                            <div className='fixed-bottom-empty-chart'>
                                <Menu>
                                    <MenuItem destructive label="Empty chart" onClick={() => emptyLayers()} icon={<IconDelete24/>}/>
                                </Menu>
                            </div>

                                {
                                    loadingModal && 
                                        (<div style={{display : "none"}}><UsePrevious setLastUsedReportTitle={setLastUsedReportTitle} onFinish={onLoadingFinished} reports={new_reports} skip={true}/></div>)
                                }
                        </div>
                        
                    }
            </div>
            {loadingModal && 
                <Modal small>   
                    <h4 style={{textAlign : "center"}}>Loading..</h4>
                </Modal>
            }
            {lastUsedModal &&
                <Modal small>
                    <UsePrevious setLastUsedReportTitle={setLastUsedReportTitle} onFinish={onLastUsedFinished} reports={dataLastUsed} skip={false}/>
                </Modal>
            }


        </div>
    )
}

export default SideBar
