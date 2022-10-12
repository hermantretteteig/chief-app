import { IconVisualizationPie16, IconDataString16, IconVisualizationColumn16, IconVisualizationBar16, IconVisualizationLine16, IconVisualizationAreaStacked16, IconVisualizationPivotTable16 } from "@dhis2/ui-icons"
import React from "react";


export const convertText = (text: string) => {

    switch(text.toUpperCase()) {
        case "LAST_12_MONTHS" : return "Last 12 months";
        case "LAST_3_MONTHS" : return "Last 3 months";
        case "LAST_MONTH" : return "Last month";
        default : return text;
    }

}

export const convertToIcon = (iconName : string) => {

    switch(iconName.toLocaleUpperCase()) {
        case "PIE" : return (<IconVisualizationPie16/>);
        case "TEXT" : return (<IconDataString16/>);
        case "COLUMN" : return (<IconVisualizationColumn16/>);
        case "BAR" : return (<IconVisualizationBar16/>);
        case "LINE" : return (<IconVisualizationLine16/>);
        case "AREA" : return (<IconVisualizationAreaStacked16/>);
        case "PIVOT" : return (<IconVisualizationPivotTable16/>);
        default : return "";
    }

}