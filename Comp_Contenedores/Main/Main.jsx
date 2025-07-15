import './Main.css'
import { MascotasComponent } from '../../Componentes/MascotasComponent/MascotasComponent'
import { LoginComponente } from '../../Componentes/LoginComponente/LoginComponente'
import { useState } from 'react'
export const Main = () => {
    const [component, setComponent] = useState(<LoginComponente />)
    return (
        <div>
            <div className="navBar">
                <ul>
                    <li onClick={() => setComponent(<LoginComponente />)}>Login</li>
                    <li onClick={() => setComponent(<MascotasComponent />)}>Mascotas</li>
                </ul>
            </div>
            {component}
        </div>
    )
}