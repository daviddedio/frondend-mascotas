import { UseGlobalContext } from "../../Context/GlobalContext"
import './LogOutForm.css'

export const LogOutForm = () => {
    const { setLogin } = UseGlobalContext()
    return (
        <div className="logOut-content">
            <h1>Excelente!</h1>
            <h4>Te has logueado correctamente</h4>
            <button onClick={() => setLogin(null)}>Click aqui para Log Out</button>
        </div>
    )
}