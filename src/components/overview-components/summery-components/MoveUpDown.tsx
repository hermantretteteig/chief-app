import React, {useState} from 'react'
import {FlyoutMenu, Menu, Button, ButtonStrip, MenuItem, Modal, ModalTitle, ModalContent, ModalActions} from "@dhis2/ui";
import {IconDelete24, IconArrowDown24, IconArrowUp24} from "@dhis2/ui-icons";
import { useLayerContext } from '../../../contexts/LayerContext';
import { ILayer } from '../../../interfaces/Layer';
import AreYouSureModal from './AreYouSureModal';
import "./move-up-down.css"

interface MoreOptionsProps{
    index : number,
    layerName : string,
    
}


const MoveUpDown = ({index, layerName} : MoreOptionsProps) => {

    const { layers, setLayers } = useLayerContext()

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    //const [index_loc, setindex] = useState(index)

    const onDeleteItem = () => {
        console.log(layers);
        const newItems = [...layers].filter((obj : ILayer, i) => {
            console.log(index);
            return i !== index;
        })
        console.log(newItems);

        setLayers(newItems);
    }

    const openDialog = () => {
        console.log("open..");
        setModalOpen(true);
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

        return;

    }
    
    return (
        <div>
           
                <Button className="up-down-button" disabled={index === 0} onClick={() => swapLayers("up")} icon={<IconArrowUp24/>}/>
                <Button className="up-down-button" disabled={index === layers.length-1}  onClick={() => swapLayers("down")}  icon={<IconArrowDown24/>}/>
           
        </div>
        
    )
}
            
    

export default MoveUpDown