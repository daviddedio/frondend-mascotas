import './LoginComponente.css'
import { RegisterForm } from '../../Formularios/RegisterForm/RegisterForm'
import { LoginForm } from '../../Formularios/LoginForm/LoginForm'
import { useState } from 'react'
import { UseGlobalContext } from '../../Context/GlobalContext'
import { LogOutForm } from '../../Formularios/LogOut/LogOutForm'

export const LoginComponente = () => {
    const { login } = UseGlobalContext()

    const seleccionar = (data) => {
        if (data == 'tab1') {
            setActive(['tab-selected', 'disabled'])
            setComponente(<RegisterForm next={seleccionar} />)
        }

        if (data == 'tab2') {
            setActive(['disabled', 'tab-selected'])
            setComponente(<LoginForm />)
        }
    }

    const [componente, setComponente] = useState(<RegisterForm next={seleccionar} />)
    const [active, setActive] = useState(['tab-selected', 'disabled'])

    return (
        <div>
            {
                login
                    ? <LogOutForm />
                    :
                    <div className="tabs">
                        <input type="radio"
                            id="tab1"
                            name="tab-group"
                            onClick={e => seleccionar(e.target.id)}
                        />
                        <input type="radio"
                            id="tab2"
                            name="tab-group"
                            onClick={e => seleccionar(e.target.id)}
                        />
                        <div className="tab-labels">
                            <label htmlFor="tab1" className={active[0]}>Registrar</label>
                            <label htmlFor="tab2" className={active[1]}>Log In</label>
                        </div>
                        <div className="tab-content">
                            {componente}
                        </div>
                    </div>
            }
        </div>
    )
}