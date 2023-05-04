import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import contracts from '../contracts.js';
import factoryABI from '../PostV1Factory.json';

export default function Reply({ item }) {
  const [messageText, setMessageText] = useState('');
  const submitReply = async (event) => {
    event.preventDefault();
    // TODO fix this wonkiness
    setMessageText(event.target.message.value);
    await refetch();
    write?.();
  };
  const { config, refetch, isError } = usePrepareContractWrite({
    address: contracts.PostV1Factory,
    abi: factoryABI,
    functionName: 'createNew',
    args: [ messageText, item ],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
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
