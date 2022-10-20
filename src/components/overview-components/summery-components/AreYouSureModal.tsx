import React, {useState, useEffect} from 'react'
import {FlyoutMenu, Button, ButtonStrip, MenuItem, Modal, ModalTitle, ModalContent, ModalActions} from "@dhis2/ui";

interface AreYouSureModalProps {
    onDelete : () => void
    open : boolean
    setOpen : (open : boolean) => void;
    layerName : string
}


const AreYouSureModal = ({onDelete, open, setOpen, layerName} : AreYouSureModalProps) => {
  

    

  
    return (
    <div>
    
            <Modal small hide={!open}>
                <ModalTitle>
                    Are you sure you want to delete the {layerName}-chart?
                </ModalTitle>
                
                <ModalActions>
                    <ButtonStrip end
                >
                        <Button secondary onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button destructive onClick={onDelete} >
                            Delete
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
         
   
    </div>

  )
}

export default AreYouSureModal


