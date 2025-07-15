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
                setLogin(response.token)
                setComponent(<MensajeComponent titulo={'Login correcto'} imagen={'correcto'}/>)
                setOpenModal(true)
            } else {
                setComponent(<MensajeComponent titulo={'Datos incorrectos'} imagen={"error"}/>)
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