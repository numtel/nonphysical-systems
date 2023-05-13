import React, { useState } from 'react';
import { useContractWrite } from 'wagmi';

import {contracts} from '../contracts.js';

// TODO allow choosing which type of post to create
export default function Reply({ item }) {
  const submitReply = (event) => {
    event.preventDefault();
    write({
      recklesslySetUnpreparedArgs: [event.target.message.value, item]
    });
  };
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...contracts.PostV1Factory,
    functionName: 'createNew',
    mode: 'recklesslyUnprepared',
    args: ['', item],
  });
  return (
    <form onSubmit={submitReply}>
      <fieldset>
        <legend>Add reply</legend>
        <textarea name="message"></textarea>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}
