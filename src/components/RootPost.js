import { useAccount, useNetwork, useEnsName, useContractReads } from 'wagmi';

import Post from './Post.js';
import {contracts, interfaces} from '../contracts.js';

export default function RootPost({ contract }) {
  const toRead = [
    { // 0
      ...contracts.PostBrowser, functionName: 'fetchReplies',
      args: [contract.address, 0, 100, true]
    },
    { // 1
      ...contracts.PostBrowser, functionName: 'properties',
      args: [contract.address]
    },
    { // 2
      ...contracts.PostBrowser, functionName: 'matchingInterfaces',
      args: [contract.address]
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
      : isError || data[0] === null ? (<p>Error!</p>)
      : (<>
        <Post item={contract.address} status={0} replies={data[0].items} properties={data[1]} matchingInterfaces={data[2]}></Post>
      </>)}
  </>);
}
