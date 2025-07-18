export const getTypeAnimal = (tipo) => {
    switch (tipo) {
        case "dog":
            return <i className="fa-solid fa-dog fa-xl"></i>
            break;
        case "cat":
            return <i className="fa-solid fa-cat fa-xl"></i>
            break;
        case "bird":
            return <i className="fa-solid fa-dove fa-xl"></i>
            break;
        default:
            break;
    }
}

export const getStatusAdoption = (tipo) => {
    switch (tipo) {
        case true:
            return <i className="fa-solid fa-house-medical-circle-check green-house"></i>
            break;
        case false:
            return <i className="fa-solid fa-house-medical-circle-xmark red-house"></i>
            break;
        default:
            break;
    }
}

export const returnTipo = (tipo) => {
    if (tipo === 'Ingresar') { return 'POST' }
    if (tipo === 'Actualizar') { return 'PUT' }
}
