const React = require('react');
const FormsView = require('../view');
const { render, screen, fireEvent } = require('@testing-library/react');

describe('La view de la page Forms', () => {
    let component;
    const i18n = { gettext: text => text };

    beforeEach(() => {
        component = render(<FormsView i18n={i18n}/>);
    });

    it('1) Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });
});