import './CreateUpdatePetForm.css'
import { ButtonLoader } from '../../Componentes/Loader/ButtonLoader'
import { useEffect, useState } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'
import { returnTipo } from '../../helper/helper'
import { MensajeComponent } from '../../Componentes/MensajeComponent/MensajeComponent'

export const CreateUpdatePetForm = ({ pet, tipo, funcion, id }) => {

    const [loading, setLoadin] = useState(false)
    const [error, setError] = useState(null)
    const [fondo, setFondo] = useState(pet ? `back${pet.tipo}` : 'backcat')

    const { login, setOpenModal, setComponent } = UseGlobalContext()

    const [formData, setFormData] = useState({
        nombre: pet ? pet.nombre : '',
        tipo: pet ? pet.tipo : '',
        raza: pet ? pet.raza : '',
        edad: pet ? pet.edad : 0,
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
        createUpdatePets(tipo, formData, id)
    }

    const createUpdatePets = async (method, pet, id) => {
        const endPoint = returnTipo(method)
        var urlApi
        if (id) {
            urlApi = `https://nmdb-alpha.vercel.app/pets/${id}`
        } else {
            urlApi = "https://nmdb-alpha.vercel.app/pets"
        }

        try {
            const rta = await fetch(urlApi,
                {
                    method: endPoint,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${login.token}`
                    },
                    body: JSON.stringify({
                        "nombre": pet.nombre,
                        "tipo": pet.tipo,
                        "raza": pet.raza,
                        "edad": Number(pet.edad),
                        "adoptado": false,
                        "descripcion": pet.descripcion
                    })
                }
            )
            const dtos = await rta.json()
            console.log(dtos)
            setOpenModal(false)
            setComponent(<MensajeComponent titulo={"Accion completada con exito"} imagen={"correcto"} />)
            setOpenModal(true)
            funcion()
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
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

                <button type="submit">{loading ? <ButtonLoader /> : "Registrar"}</button>
            </form>
        </div>

    );
}