import React from 'react'
import {FlyoutMenu, Button, ButtonStrip, MenuItem, Modal, ModalTitle, ModalContent, ModalActions} from "@dhis2/ui";

interface AreYouSureModalProps {
    onDelete : () => void
    open : boolean
    setOpen : (open : boolean) => void;
    layerName : string
}


const AreYouSureModal = ({onDelete, open, setOpen, layerName} : AreYouSureModalProps) => {
  return (
    <div style={open ? {} : {display : "none"}}>
        <Modal small>
            <ModalTitle>
                Are you sureyou want to delete <b>{layerName}</b> this item?
            </ModalTitle>
            
            <ModalActions>
                <ButtonStrip end
        >
                    <Button secondary onClick={setOpen(false)}>
                        Cancel
                    </Button>
                    <Button danger onClick={onDelete} >
                        Delete
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    </div>
  )
}

export default AreYouSureModal