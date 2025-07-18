import { useState } from 'react';
import './LoginForm.css'
import { UseGlobalContext } from '../../Context/GlobalContext';
import { ButtonLoader } from '../../Componentes/Loader/ButtonLoader';
import { MensajeComponent } from '../../Componentes/MensajeComponent/MensajeComponent';

export const LoginForm = () => {

    const { setLogin, setOpenModal, setComponent } = UseGlobalContext()
    const [loading, setLoadin] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        clave: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    //const loginError 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) {
            return
        }
        // Acá podrías validar emails coincidentes o enviar los datos
        setLoadin(true)
        try {
            const res = await fetch('https://nmdb-alpha.vercel.app/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        clave: formData.clave,
                    })
                }
            )
            const response = await res.json()

            if (response.token) {
                setLogin({token: response.token, user: formData.email})
                console.log({token: response.token, user: formData.email})
                setComponent(<MensajeComponent titulo={'Login correcto'} imagen={"https://firebasestorage.googleapis.com/v0/b/cvelectronicodediodavid.appspot.com/o/correcto.jpg?alt=media&token=4ac613f6-a86a-4b03-a1fa-7f651793d53f"}/>)
                setOpenModal(true)
            } else {
                setComponent(<MensajeComponent titulo={'Datos incorrectos'} imagen={"https://firebasestorage.googleapis.com/v0/b/cvelectronicodediodavid.appspot.com/o/error.jpg?alt=media&token=6b3fe85f-2764-4d23-930e-091f289d70e2"}/>)
                setOpenModal(true)
                setFormData({
                    email: '',
                    clave: '',
                })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoadin(false)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico:</label>
            <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="clave">Clave:</label>
            <input
                type="password"
                id="clave"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
            />
            <a className='forgot'>Olvidaste tu clave?</a>

            <button type="submit">{loading ? <ButtonLoader /> : "Acceso"}</button>
        </form>
    );
}