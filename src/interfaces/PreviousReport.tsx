import { ILayer } from "./Layer";

export interface IPreviousReport {
    dateCreated : Date,
    layers : ILayer,
    reportTitle : string
}
