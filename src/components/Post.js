
import UserBadge from './UserBadge.js';

export default function Post({ item, message, owner, status, replies }) {
  return (<>
    <div className="post">
      <UserBadge address={owner}></UserBadge>
      <p className="message">{message}</p>
    </div>
    {replies && replies.length > 0 && (
      <ul className="replies">
        {replies.map(reply => (<Post
          key={reply.item}
          item={reply.item}
          message={reply.message}
          owner={reply.owner}
          status={reply.status}
        ></Post>))}
      </ul>
    )}
  </>)
}
