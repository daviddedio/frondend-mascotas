import './MascotasComponent.css'
import { useState, useEffect } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'
import { CreateUpdatePetForm } from '../../Formularios/CreateUpdatePet/CreateUpdatePetForm'
import { LoaderComponent } from '../LoaderComponent/LoaderComponent'
import { AnimalAdoptedTable } from '../AnimalTable/AnimalAdoptedTable'
import { MensajeConfirmComponent } from '../MensajeConfirmComponent/MensajeConfirmComponent'

export const MascotasAdoptedComponent = () => {

    const { openModal, setOpenModal, setComponent, login } = UseGlobalContext()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)

    const getData = async () => {
        setLoading(true)
        try {
            const rta = await fetch('https://nmdb-alpha.vercel.app/pets')
            const dtos = await rta.json()
            setData(dtos.filter(pet => pet.responsable == login.user))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const adoptPet = async (e, id, nombre) => {
        e.preventDefault()
        setComponent(<MensajeConfirmComponent funcion={getData} id={id} nombre={nombre} tipo={"devolver"} />)
        setOpenModal(true)
    }


    useEffect(() => { getData() }, [])

    return (
        <>
            <div className="mascota-container-component">
                <h1>Mis mascotas</h1>
                <p>Cantidad de mascotas que cuidas: {data ? data.length : "Calculando"}</p>
                {
                    loading
                        ? <LoaderComponent />
                        : <AnimalAdoptedTable
                            data={data}
                            adoptPet={adoptPet} />
                }
            </div>
        </>
    )
}