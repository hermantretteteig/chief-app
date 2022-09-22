import { ILayer } from "../../../interfaces/Layer";

export const fake_layers : ILayer[] = [
    {
      mainTitle : "ANC checkup",
      id : "345",
      imageBlobUrl : "https://www.microsoft.com/en-us/microsoft-365/blog/uploads/sites/2/2012/06/Excel-charts-11.png",
      chartType : "Linear",
      orgUnit : "Boa",
      dataElement : "ANC 1st visit",
      timePeriod : "LAST_MONTH",
      customText : null,
      index : 0,
    },
    {
      mainTitle : "Malaria cases",
      id : "3",
      imageBlobUrl : "https://www.microsoft.com/en-us/microsoft-365/blog/uploads/sites/2/2012/06/Excel-charts-11.png",
      chartType : "Barchart",
      orgUnit : "Boa",
      dataElement : "Malari cases",
      timePeriod : "LAST_12_MONTHS",
      customText : null,
      index : 1
    },
    {
      mainTitle : "TB cases",
      id : "5",
      imageBlobUrl : "https://www.microsoft.com/en-us/microsoft-365/blog/uploads/sites/2/2012/06/Excel-charts-11.png",
      chartType : "Barchart",
      orgUnit : "Boa",
      dataElement : "TB-caes detected",
      timePeriod : "LAST_MONTH",
      customText : null,
      index : 2
    },
    {
      mainTitle : "My personal note",
      id : "16",
      imageBlobUrl : "https://www.microsoft.com/en-us/microsoft-365/blog/uploads/sites/2/2012/06/Excel-charts-11.png",
      chartType : "Note",
      orgUnit : "Boa",
      dataElement : "",
      timePeriod : "",
      customText : "The  TB-caes from last month was not tracked, due to technical problems.",
      index : 3
    }
]