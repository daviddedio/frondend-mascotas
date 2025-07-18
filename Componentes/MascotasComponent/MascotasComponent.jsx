import './MascotasComponent.css'
import { useState, useEffect } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'
import { AnimalTable } from '../AnimalTable/AnimalTable'
import { CreateUpdatePetForm } from '../../Formularios/CreateUpdatePet/CreateUpdatePetForm'
import { LoaderComponent } from '../LoaderComponent/LoaderComponent'
import { MensajeConfirmComponent } from '../MensajeConfirmComponent/MensajeConfirmComponent'

export const MascotasComponent = () => {

    const { openModal, setOpenModal, setComponent, login } = UseGlobalContext()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [superData, setSuperData] = useState(null)

    const getData = async () => {
        setLoading(true)
        try {
            const rta = await fetch('https://nmdb-alpha.vercel.app/pets')
            const dtos = await rta.json()
            setData(dtos.filter(pet => pet.adoptado == false))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deletePet = async (e, id, nombre) => {
        e.preventDefault()
        setComponent(<MensajeConfirmComponent funcion={getData} id={id} nombre={nombre} tipo={"borrar"} />)
        setOpenModal(true)
    }

    const adoptPet = async (e, id, nombre) => {
        e.preventDefault()
        setComponent(<MensajeConfirmComponent funcion={getData} id={id} nombre={nombre} tipo={"adoptar"} />)
        setOpenModal(true)
    }

    const addUpdatePet = (e, pet, method, id) => {
        e.preventDefault()
        setComponent(<CreateUpdatePetForm pet={pet} tipo={method} funcion={getData} id={id} />)
        setOpenModal(true)
    }

    const filtrarDatos = (e) => {
        const { value } = e.target
        if (!superData) {
            setSuperData(data)
        }

        if (value == "todo") {
            setData(superData)
        } else {
            const other = superData.filter(e => e.tipo == value)
            setData(other)
        }
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            <div className="mascota-container-component">
                <h1>Listado de mascotas</h1>
                <p>Cantidad de mascotas disponibles: {data ? data.length : "Calculando"}</p>
                <div className="opciones-op">
                    {
                        login &&
                        <a href="" onClick={(e) => addUpdatePet(e, {}, "Ingresar")}><i className="fa-solid fa-plus"></i> Agregar mascota</a>
                    }
                    <div className="filtro-conteiner">
                        <label htmlFor="filtro-animal">Filtro</label>
                        <select name="filtro-animal" id="filtro-animal" onChange={(e) => filtrarDatos(e)}>
                            <option value="todo">...</option>
                            <option value="cat">Gato</option>
                            <option value="dog">Perro</option>
                            <option value="bird">Ave</option>
                        </select>
                    </div>
                </div>
                {
                    loading
                        ? <LoaderComponent />
                        : <AnimalTable
                            data={data}
                            deletePets={deletePet}
                            addUpdatePet={addUpdatePet}
                            adoptPet={adoptPet} />
                }
            </div>
        </>
    )
}