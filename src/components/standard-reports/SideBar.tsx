import { Menu, MenuItem, Modal } from '@dhis2/ui';
import React, { useState } from 'react'
import { Button } from '@dhis2-ui/button'
import { IconDelete24 } from "@dhis2/ui-icons"
import { UsePrevious } from '../add-chart-components/use-previous/UsePrevious';
import { IPreviousReport } from '../../interfaces/PreviousReport';
import { ILayer } from '../../interfaces/Layer';
import { allStandard } from './config-standard';
import { IStandard } from '../../interfaces/Standard';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { useLayerContext } from '../../contexts/LayerContext';

interface sidebarProps {
    open: boolean,
    setOpen: (open: boolean) => void;
    reportName: string,
    setReportName: (reportName:string) => void
}

const SideBar = ({ open, setOpen,reportName, setReportName }: sidebarProps) => {

    const {setLayers} = useLayerContext()

    const changeStatus = () => {
        setOpen(false);
    }

    const [openModal, setopenModal] = useState(false)
    const [new_reports, setnew_reports] = useState<IPreviousReport[]>([])


    const emptyLayers = () => {
        setLayers([])
        setReportName("")
    }



    const generateReport = (stanReport : IStandard) => {
        setopenModal(true);

        const new_reports: IPreviousReport[] = [{
            dateCreated : new Date(),
            layers : stanReport.layers,
            reportTitle : stanReport.standardName
        }]
        setnew_reports(new_reports);
        setReportName(stanReport.standardName)
    }

    return (
        <div>
            <div className='sidebar'>
                {open && (
                    <>
                        <div>
                            <Menu>
                                <MenuItem label="Empty chart" onClick={() => emptyLayers()} icon={<IconDelete24/>}/>
                                <hr/>

                                {
                                    allStandard.map((obj : IStandard) => (
                                        <><MenuItem label={obj.standardName} onClick={() => generateReport(obj)} /></>
                                    ))
                                }
                            </Menu>

                              {
                                openModal && 
                                (<div style={{display : "none"}}><UsePrevious setModalOpen={setopenModal} reports={new_reports} skip={true}/></div>)
                              }
                        </div>
                    </>)
                }
            </div>
            {openModal && <Modal>
                Loading..
            </Modal>}

        </div>
    )
}

export default SideBar
