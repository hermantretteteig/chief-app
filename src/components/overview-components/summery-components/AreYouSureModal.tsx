import React, {useState, useEffect} from 'react'
import {FlyoutMenu, Button, ButtonStrip, MenuItem, Modal, ModalTitle, ModalContent, ModalActions} from "@dhis2/ui";
import { ILayer } from '../../../interfaces/Layer';
import { useLayerContext } from '../../../contexts/LayerContext';
import {IconDelete24, IconArrowDown24, IconArrowUp24} from "@dhis2/ui-icons";

interface AreYouSureModalProps {
    layerName : string
    index : number
}


const AreYouSureModal = ({layerName, index} : AreYouSureModalProps) => {
  
    const [modalOpen, setModalOpen] = useState(false)

    const { layers, setLayers } = useLayerContext();


    const onDeleteItem = () => {
        const newItems = [...layers].filter((obj : ILayer, i) => {
            return i !== index;
        })
        
        setModalOpen(false);    
        setLayers(newItems);

    }

  
    return (
    <div>
        <Button destructive onClick={() => setModalOpen(true)} label="Delete chart" icon={<IconDelete24/>}/>
        
    
            {modalOpen && 
                <Modal small hide={!open}>
                    <ModalTitle>
                        Are you sure you want to delete the {layerName}-item?
                    </ModalTitle>
                    
                    <ModalActions>
                        <ButtonStrip end
                    >
                            <Button secondary onClick={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button destructive onClick={onDeleteItem} >
                                Delete
                            </Button>
                        </ButtonStrip>
                    </ModalActions>
                </Modal>
            }
         
   
    </div>

  )
}

export default AreYouSureModal


