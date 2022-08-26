const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");

function View(props) {
  const {} = props; // ssr

  const preloadedState = {};

  const [data, setData] = React.useState({ name: '', lastname: '' });
  const [errors, setErrors] = React.useState({});

  const handleInput = (e) => {
    const { value, id } = e.target;
    if (value.trim().length <= 1) {
      if(id === 'name'){
        setErrors({
          ...errors,
          [id]: 'Debe ingresar un nombre válido'
        })
      }

      if(id === 'lastname'){
        setErrors({
          ...errors,
          [id]: 'Debe ingresar un apellido válido'
        })
      }
    } else{
      setErrors({
        ...errors,
        [id]: ''
      })
      setData({
        ...data,
        [id]: value
      })
    }
  };

  console.log(errors);
  console.log(data);
  return (
    <>
      <Script>
        {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
             isJSON: true,
           })}
       `}
      </Script>

      <Script src="vendor.js" />

      <Script src="forms.js" />
      <h1>Form</h1>
      <form>
        <label htmlFor="name">Nombre</label>
        <input id="name" type="text" onBlur={handleInput} />
        {errors.name && <span>{errors.name}</span>}

        <label htmlFor="lastname">Apellido</label>
        <input id="lastname" type="text" onBlur={handleInput} />
        {errors.lastname && <span>{errors.lastname}</span>}
      </form>
    </>
  );
}

module.exports = View;
