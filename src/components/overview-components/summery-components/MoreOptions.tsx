import React, {useState} from 'react'
import {FlyoutMenu, Button, ButtonStrip, MenuItem, Modal, ModalTitle, ModalContent, ModalActions} from "@dhis2/ui";
import {IconDelete24, IconArrowDown24, IconArrowUp24} from "@dhis2/ui-icons";
import { useLayerContext } from '../../../contexts/LayerContext';
import { ILayer } from '../../../interfaces/Layer';
import AreYouSureModal from './AreYouSureModal';


interface MoreOptionsProps{
    index : number,
    layerName : string,
    increaseKey : () => void
}


const MoreOptions = ({index, layerName, increaseKey} : MoreOptionsProps) => {

    const { layers, setLayers } = useLayerContext()

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    //const [index_loc, setindex] = useState(index)

    const onDeleteItem = () => {
        const newItems = layers.filter((obj : ILayer) => {
            return obj.index !== index;
        })

        setLayers(newItems);
        increaseKey();
    }

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
        <div>
        <FlyoutMenu dense={false}>
            <MenuItem disabled={index === 0} onClick={() => swapLayers("up")} label="Move up" icon={<IconArrowUp24/>}/>
            <MenuItem disabled={index === layers.length-1}  onClick={() => swapLayers("down")} label="Move down" icon={<IconArrowDown24/>}/>
            <MenuItem onClick={onDeleteItem} label="Delete chart" icon={<IconDelete24/>}/>
        </FlyoutMenu>

        <AreYouSureModal layerName={layerName} setOpen={setModalOpen} open={modalOpen} onDelete={onDeleteItem}/>


        
        </div>
        
    )
}
            
    

export default MoreOptions