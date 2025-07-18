import './Footer.css'
export const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="informacion-propia">

                <div className="proyectos-github">
                    <h2><i className="fa-brands fa-github" /> GitHub</h2>
                    <ul className='links-footer'>
                        <li><a href="https://github.com/daviddedio/NodeMongoDB.git" target='_Blank'>Proyecto Backend</a></li>
                        <li><a href="https://github.com/daviddedio/frondend-mascotas.git" target='_Blank'>
                        Proyecto Frondend</a></li>
                    </ul>
                </div>
                <div className="cv-virtual-conteiner">
                    <h2><i className="fa-solid fa-id-card-clip"/> CV-virtual</h2>
                    <ul className='links-footer'>
                        <li>
                            <a href="https://cv-virtual-ddd.netlify.app/" target='_Blank'>Link a mi cv</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="referencias">
                <h2> <i className="fa-solid fa-robot"/> Backend</h2>
                <p>Desarrollado siguiendo el curso de LeonardoCastillo79</p>
                <ul className='links-footer'>
                    <li><a href="https://www.youtube.com/@LeonardoCastillo79" target='_Blank'>Link perfil YouTube</a></li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=BfYOo5yjeWk" target='_Blank'>
                            <i className="fa-brands fa-youtube" />
                            Crear Api REST
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=BKlcgxNYOfI" target='_Blank'>
                            <i className="fa-brands fa-youtube" />
                            Mongoose
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=DIwpTJ4oXvw" target='_Blank'>
                            <i className="fa-brands fa-youtube" />
                            Rutas publicas y privadas
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=3EMLqQ6ny80" target='_Blank'>
                            <i className="fa-brands fa-youtube" />
                            Swagger
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

//github
//dir fondend
//dir backend

//Construir Backend
//dir Leonardo

//CV-virtual