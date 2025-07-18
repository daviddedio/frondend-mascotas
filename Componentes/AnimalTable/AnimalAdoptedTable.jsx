import { getTypeAnimal, getStatusAdoption} from '../../helper/helper'
import { UseGlobalContext } from '../../Context/GlobalContext'
import './AnimalTable.css'

export const AnimalAdoptedTable = ({ data, adoptPet}) => {

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
                                    <td className='td-conteiner'>
                                        {
                                            login &&
                                            <>
                                                <a className='btn-edit' onClick={(ev) => adoptPet(ev, e._id , e.nombre )}>
                                                    <i className="fa-solid fa-right-from-bracket fa-xl"></i>
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
                                </tr>
                            </>
                    }
                </tbody>
            </table>
        </div>
    )
}