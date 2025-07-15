import './CreateUpdatePetForm.css'
import { ButtonLoader } from '../../Componentes/Loader/ButtonLoader'
import { useEffect, useState } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'

export const CreateUpdatePetForm = ({ pet, tipo, funcion, id }) => {

    const [loading, setLoadin] = useState(false)
    const [fondo, setFondo] = useState(pet ? `back${pet.tipo}` : 'backcat')

    const [formData, setFormData] = useState({
        nombre: pet ? pet.nombre : '',
        tipo: pet ? pet.tipo : '',
        raza: pet ? pet.raza : '',
        edad: pet ? pet.edad : 0,
        adoptado: pet ? pet.adoptado : false,
        descripcion: pet ? pet.descripcion : ''
    });

    const cambiarFondo = (nombre) => {
        console.log(nombre)
        setFondo(`back${nombre}`)
    }

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        const newValue =
            type === 'checkbox' ? checked :
                type === 'select-one' ? value :
                    value;

        if (type === 'select-one') {
            cambiarFondo(newValue)
        }
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadin(true)
        funcion(tipo, formData, id)
    }

    return (
        <div className='form-updateCreate-pet' >
            <h2>{tipo} datos</h2>
            <form onSubmit={handleSubmit} className='form-create-update' style={{ backgroundImage: `url('${fondo}.jpg')` }}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="tipo">Tipo de mascota</label>
                <select name="tipo" id="tipo" onChange={handleChange} value={formData.tipo}>
                    <option value="">...</option>
                    <option value="cat">Gato</option>
                    <option value="dog">Perro</option>
                    <option value="bird">Ave</option>
                </select>

                <label htmlFor="raza">Raza:</label>
                <input
                    type="text"
                    id="raza"
                    name="raza"
                    value={formData.raza}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="edad">Edad:</label>
                <input
                    type="number"
                    id="edad"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                />



                <label htmlFor="descripcion">Descripcion:</label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />

                {/* ADOPTADO? */}
                <div className='chekcbox-form'>
                    <label htmlFor="adoptado">Adoptado?</label>
                    <input
                        type="checkbox"
                        name="adoptado"
                        checked={formData.adoptado || false}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{loading ? <ButtonLoader /> : "Registrar"}</button>
            </form>
        </div>

    );
}