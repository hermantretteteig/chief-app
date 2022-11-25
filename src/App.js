import React, { useState, useEffect } from 'react';
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import { Button } from '@dhis2/ui'
import { useNavigate } from "react-router-dom";
import Mainpage from './Mainpage';
import PageContainer from './pages/PageContainer';


const MyApp = () => {

    return (
        <div className={classes.container}>
            
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                <PageContainer />
            <div className={classes.appMarginBottom}></div>
        </div>
    )
}

export default MyApp
