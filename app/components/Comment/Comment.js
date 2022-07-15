const React = require('react');


function Comment({i18n,showUserComment,handleSubmit,handleInput}) {
	return (
		<>
			<h2>{i18n.gettext('feedback')}</h2>
			<form onSubmit={handleSubmit}>
				<input 
					name='name' 
					onChange={handleInput} 
					placeholder={i18n.gettext('Tu nombre')}
				/>
				<textarea 
					name='comment' 
					onChange={handleInput}
					placeholder={i18n.gettext('Comentario')} 
				/>
				<input type='submit' />
			</form>
			<ol>

				{
					showUserComment.length ? showUserComment.map(({ name, comment }, i) => {
						return <li key={i}>
							<p>{i18n.gettext(name)}</p>
							<p>{i18n.gettext(comment)}</p>
						</li>
					}): null
				}
			</ol>
		</>
	)
}

module.exports = Comment;