const React = require('react');
const PropTypes = require('prop-types');

const AddComment = ({ i18n, setComments }) => {
    const nameRef = React.useRef('');
    const commentRef = React.useRef('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameRef.current.value && commentRef.current.value) {
            const comment = {
                name: nameRef.current.value,
                comment: commentRef.current.value
            };
            console.log(comment)
            setComments(comments => [...comments, comment]);
            nameRef.current.value = '';
            commentRef.current.value = '';
        }
    } 

    return (
        <>
            <h2>Feedback</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name="name" placeholder="Ingresa tu nombre..." ref={nameRef}/>
                <textarea name="comment" placeholder="Dejanos un comentario!" ref={commentRef}></textarea>
                <button type="submit">{i18n.gettext('Dar feedback')}</button>
            </form>
        </>
    )
}

AddComment.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired
    }).isRequired
}

module.exports = AddComment;