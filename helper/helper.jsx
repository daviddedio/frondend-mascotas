export const getTypeAnimal = (tipo) => {
    switch (tipo) {
        case "dog":
            return <i className="fa-solid fa-dog"></i>
            break;
        case "cat":
            return <i className="fa-solid fa-cat"></i>
            break;
        case "bird":
            return <i className="fa-solid fa-dove"></i>
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
