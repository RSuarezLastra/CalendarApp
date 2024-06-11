import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [open, setOpen] = useState(true);

    const onCloseModal = () => setOpen(false);
    const onOpenModal = () => setOpen(true);


    return (
        <Modal
            isOpen={open}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            <h1>Modal </h1>
            <hr />
            <p>Este es un modal de la libreria react-modal</p>

        </Modal>
    )
}
