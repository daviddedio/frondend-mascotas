import { UseGlobalContext } from "../../Context/GlobalContext"
import { useState } from "react"
import { ButtonLoader } from "../Loader/ButtonLoader"
import './MensajeConfirmComponent.css'

export const MensajeConfirmComponent = ({ id, nombre, funcion, tipo }) => {
    const [loading, setLoadin] = useState(false)
    const { login, setOpenModal } = UseGlobalContext()

    const adoptar = async (e) => {
        e.preventDefault()
        setLoadin(true)
        try {
            const res = await fetch(`https://nmdb-alpha.vercel.app/pets/${id}/adopt`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${login.token}`
                },
                body: JSON.stringify({
                    "responsable": login.user,
                    "adoptado": true
                })
            })
            const dtos = await res.json()
            console.log(dtos)
            setOpenModal(false)
            funcion()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadin(false)
        }
    }

    const devolver = async (e) => {
        e.preventDefault()
        setLoadin(true)
        try {
            const res = await fetch(`https://nmdb-alpha.vercel.app/pets/${id}/adopt`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${login.token}`
                },
                body: JSON.stringify({
                    "responsable": "",
                    "adoptado": false
                })
            })
            const dtos = await res.json()
            console.log(dtos)
            setOpenModal(false)
            funcion()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadin(false)
        }
    }

    const borrar = async (e) => {
        e.preventDefault()
        setLoadin(true)
        try {
            const res = await fetch(`https://nmdb-alpha.vercel.app/pets/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${login.token}`
                }
            })
            const dtos = await res.json()
            console.log(dtos)
            setOpenModal(false)
            funcion()
        } catch (error) {
            console.log(error)
        } finally {
            setLoadin(false)
        }
    }

    const accionForm = (e) => {
        e.preventDefault();
        switch (tipo) {
            case "adoptar":
                console.log('ejecuta adoptar')
                adoptar(e)
                break;
            case "devolver":
                console.log('ejecuta devoolver')
                devolver(e)
                break;
            case "borrar":
                borrar(e)
                break;
            default:
                console.log("error")
                break;
        }
    }

    return (
        <div className="mensaje-confirm-adopt">
            <form onSubmit={(e) => { accionForm(e) }}>
                <div className="mensaje-escrito">
                    <h2>{`${tipo}?`}</h2>
                    <p>{`Queres ${tipo} a ${nombre}?`}</p>
                </div>
                <button type="submit">{loading ? <ButtonLoader /> : tipo}</button>
            </form>


        </div>
    )
}