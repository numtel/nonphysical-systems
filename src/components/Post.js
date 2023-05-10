import React, { useState } from 'react';
import { utils } from 'ethers';

import {interfaces} from '../contracts.js';

function fixProps(props) {
  const abiCoder = new utils.AbiCoder();
  return props.reduce((out, cur) => {
    if(cur.valueType === 'string') {
      out[cur.key] = utils.toUtf8String(cur.value);
    } else if(cur.valueType ==='int32') {
      out[cur.key] = cur.value;
    } else if(cur.valueType ==='bytes4[]') {
      const mapped = [];
      for(let i = 2; i < cur.value.length; i += 64) {
        mapped.push('0x' + cur.value.slice(i, i + 8));
      }
      out[cur.key] = mapped;
    } else if(cur.valueType ==='address') {
      out[cur.key] = cur.value;
    } else {
      out[cur.key] = abiCoder.decode([cur.valueType], cur.value)[0];
    }
    return out;
  }, {});
}

export default function Post({ item, message, owner, status, replies, properties, matchingInterfaces }) {
  const [fixedProps] = useState(() => fixProps(properties));
  if('matchingInterfaces' in fixedProps) matchingInterfaces = fixedProps.matchingInterfaces;
  const [pieces, setPieces] = useState(() => {
    let pieces = Array(interfaces.length);
    matchingInterfaces.forEach(async (ifaceId, index) => {
      if(!(ifaceId in interfaces)) return;
      pieces[index] = (await import(`../interfaces/${interfaces[ifaceId]}.js`)).default;
      // Be sure to update the reference
      setPieces([].concat(pieces));
    });
    return pieces;
  });
  const loadReplies = (event) => {
    event.preventDefault();
  }

  return (<>
    <div className="post">
      {pieces && pieces.map((Piece, index) => Piece && (<Piece item={item} key={index} {...fixedProps}></Piece>))}
    </div>
    {replies && replies.length > 0 && (
      <ul className="replies">
        {replies.map(reply => (<Post
          key={reply.item}
          item={reply.item}
          properties={reply.props}
        ></Post>))}
      </ul>
    )}
    {!replies && (
      <a href="#" onClick={loadReplies}>Load replies...</a>
    )}
  </>)
}
