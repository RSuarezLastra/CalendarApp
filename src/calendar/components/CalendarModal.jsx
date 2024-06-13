import { useState, useMemo, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { es } from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

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

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();

    const [formSubmitted, setformSubmitted] = useState(false);

    const [formState, setFormState] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formState.title.length > 0)
            ? ''
            : 'is-invalid';
    }, [formState.title, formSubmitted]);

    useEffect(() => {
        if (activeEvent !== null) {
            setFormState({ ...activeEvent });
        }
    }, [activeEvent])



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

    const onSubtmit = (e) => {
        e.preventDefault();
        setformSubmitted(true);

        const difference = differenceInSeconds(formState.end, formState.start);
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Verifique las fechas ingresadas', 'error');
            return
        };

        if (formState.title.length === 0) {
            Swal.fire('El titulo es requerido', 'Ingrese un titulo', 'error');
            return
        };

        console.log(formState);
    }


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubtmit}>

                <div className="form-group mb-2">
                    <label >Fecha y hora inicio</label>
                    <DatePicker
                        selected={formState.start}
                        onChange={(event) => onDateChanged(event, 'start')}
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
                        minDate={formState.end}
                        selected={formState.end}
                        onChange={(event) => onDateChanged(event, 'end')}
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
                        className={`form-control ${titleClass}`}
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
