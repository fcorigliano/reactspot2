const React = require('react');
const { useState } = React;
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');

function View(props) {
	const { i18n, translations } = props;
	const preloadedState = {
		i18n,
		translations
	};

	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});

	const PHONE_LENGTH = "El teléfono debe tener al menos 10 números";
	const NOT_MAIL = "Debe ingresar un mail valido";

	const removeError = (array, error) => {
		return array.filter(err => err !== error);
	};

	const validateData = (id, value) => {
		const myErrors = errors;
		switch (id) {
			case "phone":
				if (value.length < 10) {
					if (!myErrors[id]) {
						myErrors[id] = [PHONE_LENGTH];
					} else if (myErrors[id].indexOf(PHONE_LENGTH) === -1) {
						myErrors[id] = [...myErrors[id], PHONE_LENGTH];
					}
				} else {
					myErrors[id] = removeError(myErrors[id], PHONE_LENGTH);
				}
				break;
			case "email":
				if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) {
					if (!myErrors[id]) {
						myErrors[id] = [NOT_MAIL];
					} else if (myErrors[id].indexOf(NOT_MAIL) === -1) {
						myErrors[id] = [...myErrors[id], NOT_MAIL];
					}
				} else {
					myErrors[id] = removeError(myErrors[id], NOT_MAIL);
				}
				break;
			default:
				break;
		}
		setErrors(myErrors);
		return true;
	};

	const handleBlur = (e) => {
		const { value, id } = e.target;
		if (validateData(id, value)) {
			setValues({ ...values, [id]: value });
		}
	};

	return (
		<section className="demo">

			<Head>
				<title>
					{i18n.gettext('Registry Form Page')}
				</title>
			</Head>

			<Style href="registryForm.css" />
			<Script>
				{`
					window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
					console.log('Registry Form page is loaded!');
				`}
			</Script>
			<Script src="vendor.js" />
			<Script src="registryForm.js" />

			<form style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<label to="phone">
						{i18n.gettext('Celular')}:
						<input
							id="phone"
							placeholder="Ingresa tu telefono"
							type="tel"
							onBlur={handleBlur}
						/>
						{
							errors.phone
								? errors.phone.map((err, id) => (
									<span key={id}>{i18n.gettext(err)}</span>
								))
								: null
						}
					</label>
				</div>
				<div>
					<label to="email">
						{i18n.gettext('Email')}:
						<input
							id="email"
							placeholder="email"
							type="email"
							onBlur={handleBlur}
						/>
						{
							errors.email
								? errors.email.map((err, id) => (
									<span key={id}>{i18n.gettext(err)}</span>
								))
								: null
						}
					</label>
				</div>
			</form>

		</section>
	);
}

View.propTypes = {
	i18n: PropTypes.shape({
		gettext: PropTypes.func.isRequired,
	}).isRequired,
	translations: PropTypes.shape({})
};

View.defaultProps = {
	translations: {}
};

module.exports = injectI18n(View);
