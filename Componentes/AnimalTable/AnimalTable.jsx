import { getTypeAnimal, getStatusAdoption } from '../../helper/helper'
import { UseGlobalContext } from '../../Context/GlobalContext'
import './AnimalTable.css'

export const AnimalTable = ({ data, deletePets, addUpdatePet }) => {

    const { login } = UseGlobalContext()

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className='tipo'>Tipo</th>
                        <th className='nombre'>Nombre</th>
                        <th className='raza'>Raza</th>
                        <th className='edad'>Edad</th>
                        <th className='desc'>Descripcion</th>
                        <th className='estado'>Estado</th>
                        <th className='acciones'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                            ? data.map((e, i) =>
                                <tr key={i}>
                                    <td>{getTypeAnimal(e.tipo)}</td>
                                    <td>{e.nombre}</td>
                                    <td>{e.raza}</td>
                                    <td>{e.edad}</td>
                                    <td>{e.descripcion}</td>
                                    <td>{getStatusAdoption(e.adoptado)}</td>
                                    <td>
                                        {
                                            login &&
                                            <>
                                                <a onClick={(ev) => addUpdatePet(ev, e , "Actualizar", e._id)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </a>
                                                <a onClick={() => deletePets(e._id)}>
                                                    <i className="fa-solid fa-eraser"></i>
                                                </a>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                            :
                            <>
                                <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                            </>
                    }
                </tbody>
            </table>
        </div>
    )
}