const React = require('react');
const { useState } = React;
// El array va a ser el array que contenga los errores de un campo específico,
// mientras error sería el error puntual que queremos eliminar.
const removeError = (array, error) => {
    // Este filter recorre el array de errores del campo y devuelve aquellos que NO sean el error pasado
    // por parámetro. De esta forma lo eliminamos del array.
    return array.filter(err => err !== error);
};
const Form = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const PHONE_LENGTH = 'Tu número de teléfono debe contener al menos 10 números.'
    // const NAME_LENGTH = 'Tu nombre debe tener más de 2 caracteres.';
    // const LAST_NAME_LENGTH = 'Tu apellido debe tener más de 2 caracteres.';
    // const EMAIL_TYPE = 'Por favor ingresa un mail válido.';
    // Esta función valida los datos que nos llegan desde los input. Id puede ser name también.
    const validateData = (id, value) => {
        const myErrors = errors;
        switch (id) {
            case "phone":
                // Corrobramos que el campo cumpla con las condiciones.
                if (value.length < 10) {
                    // Corroboramos que todavía no exista el error. Si no existe, lo crea.
                    // My errors es un objeto. Ese objeto tiene una propiedad para cada campo,
                    // con el nombre de esa propiedad igual al id del elemento.
                    // Cada propiedad de errores de cada campo es un array de mensajes de error.
                    // const myErrors = {
                    //     name: [NAME_LENGTH],
                    //     phone: [PHONE_LENGTH]
                    //     ...etc
                    // }
                    // Si no existe la propiedad `phone`, dentro del objeto de errores, entonces
                    // se crea, y se crea con el valor que contenga la constante PHONE_LENGTH.
                    if (!myErrors[id]) {
                        myErrors[id] = [PHONE_LENGTH]
                        // Si el objeto de errores ya existe, pero no existe este error en particular
                        // (por eso el -1), vamos a agregarlo al array de errores.
                        // Es decir, cada error, va a ser un array de 1 o más errores, cuando los haya.
                    } else if (myErrors[id].indexOf(PHONE_LENGTH) === -1) {
                        myErrors[id] = [...myErrors[id], PHONE_LENGTH];
                    }
                } else {
                    // Si no entra en el condicional de la longitud de caracteres, quiere decir que
                    // cumple con la condición y que debemos remover ese error con removeError().
                    myErrors[id] = removeError(myErrors[id], PHONE_LENGTH);
                }
                break;
            default:
                break;
        }
        // Seteamos nuestro estado errors a los nuevos errors resultantes del filtrado
        // hecho por nuestro switch statement.
        setErrors(myErrors);

        // Utilizamos el array de keys de nuestros errores y verificamos que la longitud
        // de cada uno sea 0, para que el form esté validado, y dejar en true el hasNoErrors.
        // Si alguna array de las props de myErrors tiene 1 o más elementos, nuestro form no
        // estará validado y hasNoErrors será false.
        let errorsArray = Object.keys(myErrors);
        let hasNoErrors = true;
        errorsArray.forEach(key => {
            if (myErrors[key].length > 0) hasNoErrors = false;
        });

        // En definitiva, la función validadora va a devolver true o false y en base a eso
        // envía los datos o no.
        // Si devuelve false, mostramos los errores.
        return hasNoErrors;
    }

    function handleBlur(e) {
        const { id, value } = e.target;
        if (validateData(id, value)) {
            setValues({
                ...values,
                [id]: value
            })
        }
    }

    return (
        <form
            action="/"
            method="post"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <div>
                <label ht>Phone</label>
                <input
                    id="phone"
                    placeholder="Ingresa tu número de teléfono"
                    type="number"
                    onBlur={handleBlur}
                />
                {
                    errors.phone ? errors.phone.map((err, id) => (
                        <span key={id}>{err}</span>
                    ))
                        : null
                }
            </div>
            <button onSubmit={handleSubmit}>Send</button>
        </form>
    )
}

module.exports = Form;