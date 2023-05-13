import factoryABI from './PostV1Factory.json';
import browserABI from './PostBrowser.json';
import postABI from './PostV1.json';

export const contracts = {
  PostV1Factory: {address: '0xb52a4E0e51b21a53DD93bB02fB6f08E4Da03F02B', abi: factoryABI},
  PostBrowser: {address: '0x78735704742cc88eea881d5a7da5766a84f79160', abi: browserABI},
  root: {address: '0x3E8b03679A3eb0958214c5ebA72E2beca18E49A0', abi: postABI},
};

// This is the only reference to the files in the src/interfaces/ directory
export const interfaces = {
  "0xe507d13a": "IAllowReplies",
  "0x39d77e9a": "IAllowRepliesStatus",
  "0xd0452e3f": "IMessage",
  "0x9aba4139": "IMessageEditable"
};

