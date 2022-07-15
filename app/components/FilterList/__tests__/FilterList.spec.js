const React = require('react');
const FilterList = require('..');
const {render} = require('@testing-library/react');


describe('<FilterList/>',()=>{
    it('Renderiza correctamente',()=>{
        const i18n = {gettext: text => text};
    
        const { asFragment } = render(<FilterList 
            i18n={i18n}
            price={{min:0,max:0}} 
            setPrice={jest.fn()}
            category={[]} 
            setCategory={jest.fn()}
            />);
        expect(asFragment()).toMatchSnapshot();
    })
})