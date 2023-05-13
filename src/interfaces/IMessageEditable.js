import React, { useState } from 'react';
import { useContractWrite, useAccount } from 'wagmi';

import UserBadge from '../components/UserBadge.js';

import abi from './IMessageEditable.json'

export default function IMessageEditable({ owner, lastEdited, message, item }) {
  const { address } = useAccount();
  const [messageText, setMessageText] = useState(message);
  const [showEdit, setShowEdit] = useState(false);

  const submitEdit = async (event) => {
    event.preventDefault();
    write({
      recklesslySetUnpreparedArgs: [event.target.message.value]
    });
  };

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: item,
    abi,
    functionName: 'editMessage',
    mode: 'recklesslyUnprepared',
    args: [ '' ],
  });

  return (<>
    <UserBadge address={owner}></UserBadge>
    <p className="last-edited">Last Edited: {lastEdited.eq('0') ? "Never" : new Date(lastEdited.toString() * 1000).toLocaleString()}</p>
    {address && address.toLowerCase() === owner.toLowerCase() && (<button onClick={() => setShowEdit(!showEdit)}>Edit</button>)}
    {showEdit && (
      <form onSubmit={submitEdit}>
        <fieldset>
          <legend>Edit Message</legend>
          <textarea name="message" value={messageText} onChange={(e) => setMessageText(e.target.value)}></textarea>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    )}
  </>);
}
