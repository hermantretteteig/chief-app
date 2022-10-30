import { createContext, useContext } from "react"
import { ILayer } from "../interfaces/Layer"
import { IPreviousReport } from "../interfaces/PreviousReport"

export type PreviousContent = {
   previousReports: IPreviousReport[],
  setPreviousReports:(previousReports: IPreviousReport[]) => void
}
export const PreviousContext = createContext<PreviousContent>({
    previousReports: [], // set a default value
    setPreviousReports: () => {},
})

export const usePreviousContext = () => useContext(PreviousContext)
