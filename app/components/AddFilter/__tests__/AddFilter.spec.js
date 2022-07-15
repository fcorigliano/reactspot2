const React = require('react');
const AddFilter = require('..');
const {render} = require('@testing-library/react');


describe('<AddFilter/>',()=>{
    it('Renderiza correctamente',()=>{
        const i18n = {gettext: text => text};
    
        const { asFragment } = render(<AddFilter i18n={i18n}/>);
        expect(asFragment()).toMatchSnapshot();
    })
})