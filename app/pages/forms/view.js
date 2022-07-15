const React = require('react');
const { useState } = React;
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const AddFilter = require('../../components/AddFilter');
const FilterList = require('../../components/FilterList');
const Comment = require('../../components/Comment');

function View(props) {
  const { i18n, translations} = props;
  const preloadedState = {
    i18n,
    translations,
  };

  const [price,setPrice] = useState({min:0,max:0});
  const [category,setCategory]= useState([]);
  const [userComment, setUserComment] = useState({name:'',comment:''});
  const [showUserComment, setShowUserComment] = useState([]);

  const handleInput =(e)=>{
    const { name, value} = e.target;
    setUserComment({...userComment,[name]:value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setShowUserComment([...showUserComment,userComment])
  }
  // console.log(userComment);
  return (
    <>

      <Head>
        <title>
          {i18n.gettext('Forms Page')}
        </title>
      </Head>

      <Style href="forms.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('Forms page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="forms.js" />
      {/** Traer los componentes AddFilter y FilterList para que la View los renderice*/}
      
      <AddFilter i18n={i18n}price={price} setPrice={setPrice} category={category} setCategory={setCategory}/>
      <FilterList i18n={i18n} price={price} setPrice={setPrice} category={category} setCategory={setCategory}/>
      <Comment i18n={i18n} showUserComment={showUserComment} handleSubmit={handleSubmit} handleInput={handleInput}/>
      
      </>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
};

module.exports = injectI18n(View);