import React, { useState, useEffect } from 'react'
import { Button, ButtonStrip, Modal, ModalTitle, ModalContent, ModalActions } from "@dhis2/ui";
import "./overview-styles/overview.css"

interface helpProps {
    open: boolean
    setOpen: (open: boolean) => void;
}

const HelpModul = ({ open, setOpen }: helpProps) => {

    return (
        <div>
            <Modal hide={!open}>

                <ModalTitle>
                    How to download and share:
                </ModalTitle>

                <ModalActions>
                    <div className="modalContainer">
                        <img className='img-description' src="instructions.png" />
                        <div className='modalBtn'>
                            <Button secondary onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </ModalActions>

            </Modal>
        </div>

    )
}



export default HelpModul