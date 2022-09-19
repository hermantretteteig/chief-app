import { createContext, useContext } from "react"
import { ILayer } from "../interfaces/Layer"

export type LayerContent = {
  layers: ILayer[],
  setLayers:(layer: ILayer[]) => void
}
export const LayerContext = createContext<LayerContent>({
    layers: [], // set a default value
    setLayers: () => {},
})

export const useLayerContext = () => useContext(LayerContext)
