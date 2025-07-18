import './Main.css'
import { MascotasComponent } from '../../Componentes/MascotasComponent/MascotasComponent'
import { MascotasAdoptedComponent } from '../../Componentes/MascotasComponent/MascotasAdoptedComponent'
import { LoginComponente } from '../../Componentes/LoginComponente/LoginComponente'
import { useState } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'

export const Main = () => {
    const [component, setComponent] = useState(<LoginComponente />)
    const {login} = UseGlobalContext()
    return (
        <div className='body-main'>
            <div className="navBar">
                <ul>
                    <li onClick={() => setComponent(<LoginComponente />)}>Login</li>
                    <li onClick={() => setComponent(<MascotasComponent />)}>Mascotas</li>
                    <li onClick={()=>setComponent(<MascotasAdoptedComponent/>)}>Adoptados</li>
                    {
                        login && <li className='li-derecha' onClick={()=>{alert('Logeado')}}> {login.user}</li>
                    }
                </ul>
            </div>
            {component}
        </div>
    )
}