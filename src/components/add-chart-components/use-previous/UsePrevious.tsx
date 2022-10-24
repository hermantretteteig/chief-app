import React from 'react'
import { IPreviousReport } from '../../../interfaces/PreviousReport';
import { Button } from "@dhis2/ui";
import { IconArrowRight24 } from "@dhis2/ui-icons"
import "./use-previous.css";

interface UsePreviousProps {
    reports : IPreviousReport[];
}

export const UsePrevious = ({reports} : UsePreviousProps) => {


    console.log(reports);

    reports.map((obj : IPreviousReport) => {
        console.log(obj.reportTitle+" "+obj.dateCreated);
    })

  return (
    <div>
        <b className='title-last-three'>Last three reports:</b>

        <table style={{width : "100%"}}>
            <thead className='table-head'>
                <tr>
                    <td className='use-prev-cells'>
                        Name:
                    </td>
                    <td className='use-prev-cells'>
                        Date created:
                    </td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {
                    reports.map((obj : IPreviousReport, i) => (
                        <tr key={i}>
                            <td className='use-prev-cells'>{obj.reportTitle}</td>
                            <td className='use-prev-cells'>{obj.dateCreated.toString().slice(0,10)}</td>
                            <td className='use-prev-cells float-button-right'><Button primary icon={<IconArrowRight24/>}></Button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>


    </div>
  )
}
