import './MascotasComponent.css'
import { useState, useEffect } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'
import { AnimalTable } from '../AnimalTable/AnimalTable'
import { CreateUpdatePetForm } from '../../Formularios/CreateUpdatePet/CreateUpdatePetForm'
import { MensajeComponent } from '../MensajeComponent/MensajeComponent'
import { LoaderComponent } from '../LoaderComponent/LoaderComponent'

export const MascotasComponent = () => {

    const { openModal, setOpenModal, setComponent, login } = UseGlobalContext()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)

    const getData = async () => {
        setLoading(true)
        try {
            const rta = await fetch('https://nmdb-alpha.vercel.app/pets')
            const dtos = await rta.json()
            setData(dtos)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const returnTipo = (tipo) => {
        if (tipo === 'Ingresar') { return 'POST' }
        if (tipo === 'Actualizar') { return 'PUT' }
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
                        'Authorization': `Bearer ${login}`
                    },
                    body: JSON.stringify({
                        "nombre": pet.nombre,
                        "tipo": pet.tipo,
                        "raza": pet.raza,
                        "edad": Number(pet.edad),
                        "adoptado": pet.adoptado,
                        "descripcion": pet.descripcion
                    })
                }
            )
            const dtos = await rta.json()
            setOpenModal(false)
            setComponent(<MensajeComponent titulo={"Accion completada con exito"} imagen={"correcto"} />)
            setOpenModal(true)
            setTimeout(() => {
                setOpenModal(false)
            }, 2000);
            getData()
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

    const deletePet = async (id) => {
        console.log(id)
        try {
            const rta = await fetch(`https://nmdb-alpha.vercel.app/pets/${id}`, {
                method:'delete',
                headers: {
                    'content-type':'application/json',
                    'Authorization':`Bearer ${login}`
                }
            })
            const dtos = await rta.json()
            getData()
        } catch (error) {
            console.log(error.message)
        }
    }

    const addUpdatePet = (e, pet, method, id) => {
        e.preventDefault()
        setComponent(<CreateUpdatePetForm pet={pet} tipo={method} funcion={createUpdatePets} id={id} />)
        setOpenModal(true)
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            <div className="mascota-container-component">
                <h1>Listado de mascotas</h1>
                <p>Cantidad de mascotas disponibles: {data ? data.length : "Calculando"}</p>
                <a href="" onClick={(e) => addUpdatePet(e, {}, "Ingresar")}><i className="fa-solid fa-plus"></i> Agregar mascota</a>
                {
                    loading ? <LoaderComponent /> : <AnimalTable data={data} deletePets={deletePet} addUpdatePet={addUpdatePet} />
                }
            </div>
        </>
    )
}