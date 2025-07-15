import { useState } from 'react';
import { UseGlobalContext } from '../../Context/GlobalContext';
import { MensajeComponent } from '../../Componentes/MensajeComponent/MensajeComponent';
import { ButtonLoader } from '../../Componentes/Loader/ButtonLoader';
import './RegisterForm.css'

export const RegisterForm = ({ next }) => {

    const [loading, setLoading] = useState(false)
    const { setLogin, setOpenModal, setComponent } = UseGlobalContext()

    const [formData, setFormData] = useState({
        email: '',
        clave: '',
        nombre: '',
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch('https://nmdb-alpha.vercel.app/users/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre:formData.nombre,
                        email: formData.email,
                        clave: formData.clave,
                        telefono:formData.telefono
                    })
                }
            )
            const respuesta = await res.json()
            setComponent(<MensajeComponent titulo={'Registro exitoso'} mensaje={`Seguidamente realizar un logIn. Su ID id ${respuesta._id}`} imagen={"correcto"} />)
            setOpenModal(true)
            next('tab2')
        } catch (error) {
            alert('ha ocurrido un error ' + error.message)
        }finally{
            setLoading(false)
        }

        //next('tab2')
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

            <label htmlFor="nombre">Nombre completo:</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
            />

            <button type="submit">{loading ? <ButtonLoader/> : "Registrarse"}</button>
        </form>
    );
}

