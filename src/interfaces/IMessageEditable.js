import UserBadge from '../components/UserBadge.js';

export default function IMessageEditable({ owner, lastEdited }) {
  return (<>
    <UserBadge address={owner}></UserBadge>
    <p className="last-edited">Last Edited: {lastEdited.eq('0') ? "Never" : new Date(lastEdited.toString() * 1000).toLocaleString()}</p>
  </>);
}
