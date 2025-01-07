const CommentForm = ({ createComment }) => {

    const addComment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        console.log("El comentario es: ", comment)
        createComment(comment)
    }

    return (
        <div>
            <form onSubmit={addComment}>
                <input
                data-testid='comment'
                type="text"
                name="comment"
                required
                />
                <button type="submit">add comment</button>
            </form>
        </div>
    )
}

export default CommentForm