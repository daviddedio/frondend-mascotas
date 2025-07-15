import './ModalContainer.css'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { UseGlobalContext } from '../Context/GlobalContext'

export const ModalContainer = () => {
    const modalRef = useRef(null)
    const {openModal, setOpenModal, component} = UseGlobalContext()

    const closeModal = ()=>{
        setOpenModal(false)
    }
    const modalRoot = document.getElementById("modal")
    if(!openModal || !modalRoot){
        return null
    }

    return createPortal(
        <div className="overlay">
            <div className="modal" ref={modalRef}>
                <div className="barra-sup">
                    <a onClick={closeModal}><i className="fa-solid fa-xmark"></i> </a>
                </div>
                {component}
            </div>
        </div>
    , modalRoot)
}