import './MensajeComponent.css'
export const MensajeComponent = ({ titulo, mensaje, imagen }) => {
    return (
        <div className="mensaje-conteiner">
            <div className="mensaje-escrito"> 
                <h2>{titulo}</h2>
                {mensaje && <p>{mensaje}</p>}
            </div>
            <img src={`${imagen}.jpg`} alt="" />
        </div>
    )
}