import { ILayer } from "../../../interfaces/Layer";

export const fake_layers : ILayer[] = [
    {
      mainTitle : "ANC checkup",
      imageBlobUrl : "",
      chartType : "Linear",
      orgUnit : "Boa",
      dataElement : "ANC 1st visit",
      timePeriod : "LAST_MONTH",
      customText : null
    },
    {
      mainTitle : "Malaria cases",
      imageBlobUrl : "",
      chartType : "Barchart",
      orgUnit : "Boa",
      dataElement : "Malari cases",
      timePeriod : "LAST_12_MONTHS",
      customText : null
    },
    {
      mainTitle : "TB cases",
      imageBlobUrl : "",
      chartType : "Barchart",
      orgUnit : "Boa",
      dataElement : "TB-caes detected",
      timePeriod : "LAST_MONTH",
      customText : null
    },
    {
      mainTitle : "Note",
      imageBlobUrl : "",
      chartType : "",
      orgUnit : "Boa",
      dataElement : "",
      timePeriod : "",
      customText : "The  TB-caes from last month was not tracted, due to technical problems."
    }
]