import { addHours } from 'date-fns';
import { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { es } from 'date-fns/locale/es';

registerLocale('es', es)

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

    const [formState, setFormState] = useState({
        title: '',
        notes: '',
        startDate: new Date(),
        endDate: addHours(new Date(), 2),
    })

    const onCloseModal = () => setOpen(false);
    const onOpenModal = () => setOpen(true);

    const onInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: [target.value]
        });
    }

    const onDateChanged = (event, changing) => {
        setFormState({
            ...formState,
            [changing]: event
        })
    }


    return (
        <Modal
            isOpen={open}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label >Fecha y hora inicio</label>
                    <DatePicker
                        selected={formState.startDate}
                        onChange={(event) => onDateChanged(event, 'startDate')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formState.endDate}
                        selected={formState.endDate}
                        onChange={(event) => onDateChanged(event, 'endDate')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        value={formState.title}
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formState.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
