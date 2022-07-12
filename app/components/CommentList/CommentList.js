const React = require('react');
const PropTypes = require('prop-types');

const CommentList = ({ i18n, comments }) => {

    return (
        <ol>
            {
                comments.map((c, i) => (
                    <li key={i}>
                        <article>
                            <h3>{i18n.gettext(c.name)}</h3>
                            <p>{i18n.gettext(c.comment)}</p>
                        </article>
                    </li>
                ))
            }
        </ol>
    )
}

CommentList.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired
    }).isRequired
}

module.exports = CommentList;