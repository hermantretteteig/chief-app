import React, { useState, useEffect } from 'react';
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import { Button } from '@dhis2/ui'
import { useNavigate } from "react-router-dom";
import Mainpage from './Mainpage';
import PageContainer from './pages/PageContainer';


const query = {
    me: {
        resource: 'me',
    },
}


const redirect = () => {
    const message = "Hello!\nHere is you report for Kasungo district.\n\nhttps://vg.no".replace(" ", "%20")
    window.location.replace("https://wa.me/+4746802013?text=" + message);
}

const MyApp = () => {

    useEffect(() => {
        loadChart();
    }, [])


    const loadChart = () => {

    }


    return (


        <div className={classes.container}>

            {/*<DataQuery query={query}>
            
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                return (
                    <>
                      
                      {/* <Button onClick={redirect}>Send on whatsapp!</Button>}
                    </>
                )
            }}
        </DataQuery>*/}
        <PageContainer />
        </div>
    )
}

export default MyApp


/* ChartPlugin.url = "https://play.dhis2.org/demo";
   chartPlugin.username = "admin";
   chartPlugin.password = "district";
   chartPlugin.loadingIndicator = true;
 
   var r1 = { el: "report1", id: "R0DVGvXDUNP" };
 
           // Chart configuration, render to "report2" div
 
           var r2 = {
               el: "report2",
               columns: [
                   {
                       dimension: "dx",
                       items: [{ id: "YtbsuPPo010" }, { id: "l6byfWFUGaP" }],
                   },
               ],
               rows: [{ dimension: "pe", items: [{ id: "LAST_12_MONTHS" }] }],
               filters: [{ dimension: "ou", items: [{ id: "USER_ORGUNIT" }] }],
 
               // All following properties are optional
               title: "Custom title",
               type: "line",
               showValues: false,
               hideEmptyRows: true,
               regressionType: "LINEAR",
               completedOnly: true,
               targetLineValue: 100,
               targetLineTitle: "My target line title",
               baseLineValue: 20,
               baseLineTitle: "My base line title",
               aggregationType: "AVERAGE",
               rangeAxisMaxValue: 100,
               rangeAxisMinValue: 20,
               rangeAxisSteps: 5,
               rangeAxisDecimals: 2,
               rangeAxisTitle: "My range axis title",
               domainAxisTitle: "My domain axis title",
               hideLegend: true,
           };
 
           // Render the charts
 
           chartPlugin.load(r1, r2);
*/