
export default function IAllowRepliesStatus({ replyCountLTZero, replyCountGTEZero }) {
  return (<>
    <p className="replyCount">Reply count: {replyCountGTEZero.toString()}</p>
  </>);
}
