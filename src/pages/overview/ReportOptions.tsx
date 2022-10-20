import React, { useState, useEffect } from 'react'
import { Button, ButtonStrip, Modal, ModalTitle, ModalContent, ModalActions } from "@dhis2/ui";
import DefaultReport from './DefaultReport';

interface reportProps {
    selectedType: boolean
    setSelectedType: (selectedType: boolean) => void
    setReportType: (selectedReport: string) => void
    selectedReport: string
}


const ReportOptions = ({setSelectedType, selectedType, selectedReport, setReportType}: reportProps) => {
    const [] = useState<string>('');
    const [stage, setStage] = useState("options")

    const newReport = () => {
        {setSelectedType(true)}
        setReportType('new')
    }
    const defaultReport = () => {
        setStage("default-report")
    }
    const lastReport = () => {
        setStage('use-previous')
    }

    return (
        <div>
            <Modal small>
                {
                    {
                        "options" : <>    
                            <ModalTitle>
                                Choose a report:
                            </ModalTitle>

                            <ModalActions>
                                <ButtonStrip end
                                >
                                    <Button secondary onClick={newReport}>
                                        Create new report
                                    </Button>
                                    <Button secondary onClick={defaultReport}>
                                        Default report
                                    </Button>
                                    <Button secondary onClick={lastReport}>
                                        Last used report
                                    </Button>
                                </ButtonStrip>
                            </ModalActions>
                        </>,
                        "use-previous" : 
                        <>

                        </>,
                        "default-report" : 
                        <>
                            <DefaultReport generatedChart={selectedType} setGeneratedChart={setSelectedType} setReportType={setReportType}/>
                        </>
                    }
                [stage]}
            </Modal>
        </div>

    )
}



export default ReportOptions