import React, { useState } from 'react';

import UserBadge from './UserBadge.js';
import Reply from './Reply.js';

export default function Post({ item, message, owner, status, replies }) {
  const [showReply, setShowReply] = useState(false);

  return (<>
    <div className="post">
      <UserBadge address={owner}></UserBadge>
      <p className="message">{message}</p>
      <button onClick={() => setShowReply(!showReply)}>Reply</button>
      {showReply && (<Reply item={item}></Reply>)}
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
