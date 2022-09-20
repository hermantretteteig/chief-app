import React, {useState} from 'react'
import {FlyoutMenu, Button, MenuItem} from "@dhis2/ui";
import {IconDelete24, IconArrowDown24, IconArrowUp24} from "@dhis2/ui-icons";
import { useLayerContext } from '../../../contexts/LayerContext';
import { ILayer } from '../../../interfaces/Layer';


interface MoreOptionsProps{
    index : number,
    increaseKey : () => void
}


const MoreOptions = ({index, increaseKey} : MoreOptionsProps) => {

    const { layers, setLayers } = useLayerContext()

    //const [index_loc, setindex] = useState(index)

    const swapLayers = (direction : string) => {

        console.log(layers);
        let lay = [...layers];


        if(direction === "up"){
            var temp = lay[index];
            lay[index] = lay[index-1];
            lay[index-1] = temp;
        }
        if(direction === "down"){
            var temp = lay[index];
            lay[index] = lay[index+1];
            lay[index+1] = temp;
        }

        setLayers(lay);
        increaseKey();
        return;

    }
    
    return (

        <FlyoutMenu dense={false}>
            <MenuItem disabled={index === 0} onClick={() => swapLayers("up")} label="Move up" icon={<IconArrowUp24/>}/>
            <MenuItem disabled={index === layers.length-1}  onClick={() => swapLayers("down")} label="Move down" icon={<IconArrowDown24/>}/>
            <MenuItem label="Delete chart" icon={<IconDelete24/>}/>
        </FlyoutMenu>
    )
}
            
    

export default MoreOptions