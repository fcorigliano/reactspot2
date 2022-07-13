const React = require('react');
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const MeliGA = require('nordic/analytics/meli-ga');
const MelidataTrack = require('nordic/melidata/melidata-track');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const AddFilter = require('../../components/AddFilter');
const FilterList = require('../../components/FilterList');
const AddComment = require('../../components/AddComment');
const CommentList = require('../../components/CommentList');

function View(props) {
  const { i18n, translations } = props;
  const preloadedState = {
    i18n,
    translations
  };

  const [filters, setFilters] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  return (
    <div className="demo">
      {/* <MeliGA
        section="universal"
        page="test"
      />

      <MelidataTrack path="/form" event_data={{ form: 'data' }} /> */}

      <Head>
        <title>
          {i18n.gettext('Form Page')}
        </title>
      </Head>

      <Style href="forms.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('Form page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="forms.js" />

      <AddFilter i18n={i18n} setFilters={setFilters}/>

      <FilterList i18n={i18n} filters={filters} setFilters={setFilters}/>

      <AddComment i18n={i18n} setComments={setComments} />

      <CommentList i18n={i18n} comments={comments}/>

    </div>
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
