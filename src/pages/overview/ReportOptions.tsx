import React, { useState, useEffect } from 'react'
import { Button, ButtonStrip, Modal, ModalTitle, ModalContent, ModalActions } from "@dhis2/ui";
import DefaultReport from './DefaultReport';
import { useDataQuery } from '@dhis2/app-runtime';
import { UsePrevious } from '../../components/add-chart-components/use-previous/UsePrevious';
import { IPreviousReport } from '../../interfaces/PreviousReport';
import { IconArrowLeft24 } from "@dhis2/ui-icons";
import { usePreviousContext } from '../../contexts/PreviousContext';

interface reportProps {
    selectedType: boolean,
    userId : string,
    setSelectedType: (selectedType: boolean) => void
    setReportType: (selectedReport: string) => void
    selectedReport: string,
    setModalOpen : (open : boolean) => void
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


const ReportOptions = ({setSelectedType, selectedType, selectedReport, setReportType, userId, setModalOpen}: reportProps) => {
    const [] = useState<string>('');
    const [stage, setStage] = useState("options")

    const { previousReports, setPreviousReports } = usePreviousContext();

    const [nonePreviousReports, setnonePreviousReports] = useState<boolean>(true);

    const { loading : loadingLastUsed, error : errorLastUsed, data : dataLastUsed } = useDataQuery(lastUsedFromDataStore(userId))
   
   
    //setting the last used reports
    useEffect(() => {
        if(!loadingLastUsed && !errorLastUsed){
            setPreviousReports((dataLastUsed as any).results.reports as IPreviousReport[]);
        }
    }, [loadingLastUsed])
    
 
    


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
                                <ButtonStrip middle>
                                    <Button secondary onClick={newReport}>
                                        Create new report
                                    </Button>

                                    <Button secondary onClick={lastReport}>
                                        Create based on previous reports
                                    </Button>
                                </ButtonStrip>
                            </ModalActions>
                        </>,
                        "use-previous" : 
                            <>
                           
                            {
                                (errorLastUsed || loadingLastUsed) ?
                                (
                                    <div>There is none previous reports created by you.
                                        <Button onClick={newReport}>Create new report</Button>    
                                        
                                    </div>
                                )
                                    :
                                (
                                    <UsePrevious setModalOpen={setModalOpen} reports={(dataLastUsed?.results as any).reports as IPreviousReport[]}/>
                                )
                        }       
                            <div style={{marginTop : "15px"}}>
                                <Button style={{maxWidth : "25px"}} icon={<IconArrowLeft24/>} onClick={() => setStage("options")}>Go back</Button>
                            </div>
                                 
                            </>
                    }
                [stage]}
            </Modal>
        </div>

    )
}





export default ReportOptions