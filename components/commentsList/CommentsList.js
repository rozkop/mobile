import CommentItem from "./CommentItem";

function CommentsList({ postId, comments, deleteSuccessful }) {
  return comments.map((comment) => {
    return (
      <CommentItem
        key={comment.id}
        postId={postId}
        commentId={comment.id}
        authorId={comment.user.id}
        author={comment.user.name}
        date={comment.created_at}
        text={comment.text}
        rating={comment.rating}
        deleteSuccessful={deleteSuccessful}
      />
    );
  });
}

export default CommentsList;
