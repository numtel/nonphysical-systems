import React, { useState } from 'react';

import Reply from '../components/Reply.js';

export default function IAllowReplies({ item, replyCount }) {
  const [showReply, setShowReply] = useState(false);
  return (<>
    <button onClick={() => setShowReply(!showReply)}>Reply</button>
    {showReply && (<Reply item={item}></Reply>)}
  </>);
}
