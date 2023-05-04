import { useAccount, useNetwork, useEnsName, useContractReads } from 'wagmi';

import Post from './Post.js';

import contracts from '../contracts.js';
import postABI from '../PostV1.json';

export default function RootPost({ address }) {
  const toRead = [
    { // 0
      address, abi: postABI, functionName: 'message'
    },
    { // 1
      address, abi: postABI, functionName: 'owner'
    },
    { // 2
      address, abi: postABI, functionName: 'fetchReplies',
      args: [0, 0, 100, true]
    },
  ];
  const { status, data, isError, isLoading } = useContractReads({
    contracts: toRead,
    watch: false,
    onSuccess: (data) => {
      console.log(data);
    }
  });
  return (<>
      { isLoading ? (<p>Loading</p>)
      : isError ? (<p>Error!</p>)
      : (<>
        <Post item={address} message={data[0]} owner={data[1]} status={0} replies={data[2][0]}></Post>
      </>)}
  </>);
}
