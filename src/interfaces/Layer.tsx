export interface ILayer {
    id : string,
    mainTitle : string,
    imageBlobUrl : string,
    chartType : string,
    orgUnit : string,
    dataElement : string,
    timePeriod : string,
    index : number,
    customText : string | null
}