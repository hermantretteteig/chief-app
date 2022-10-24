import React, { useState, useEffect } from 'react'
import { Button, ButtonStrip, Modal, ModalTitle, ModalContent, ModalActions } from "@dhis2/ui";
import DefaultReport from './DefaultReport';
import { useDataQuery } from '@dhis2/app-runtime';
import { UsePrevious } from '../../components/add-chart-components/use-previous/UsePrevious';
import { IPreviousReport } from '../../interfaces/PreviousReport';

interface reportProps {
    selectedType: boolean,
    userId : string,
    setSelectedType: (selectedType: boolean) => void
    setReportType: (selectedReport: string) => void
    selectedReport: string
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


const ReportOptions = ({setSelectedType, selectedType, selectedReport, setReportType, userId}: reportProps) => {
    const [] = useState<string>('');
    const [stage, setStage] = useState("options")

    const [nonePreviousReports, setnonePreviousReports] = useState<boolean>(true);

    const { loading : loadingLastUsed, error : errorLastUsed, data : dataLastUsed } = useDataQuery(lastUsedFromDataStore(userId))
   


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
                            {
                                (errorLastUsed || loadingLastUsed) ?
                                (
                                    <div>There is none previous reports? Make a new one?</div>
                                )
                                    :
                                (
                                    <UsePrevious reports={(dataLastUsed?.results as any).reports as IPreviousReport[]}/>
                                )
                            }
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