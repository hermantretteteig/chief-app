export interface ILayer {
    id : string,
    mainTitle : string,
    imageBlobUrl : string,
    chartType : string,
    orgUnitId : string,
    orgUnitName : string,
    dataElementId : string,
    dataElementName : string,
    timePeriodId : string,
    timePeriodeName : string
    customText : string | null,
    theme? : string | "DANGER" | "STANDARD"
}