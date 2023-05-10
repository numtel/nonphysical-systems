
export default function IMessage({ message, created }) {
  return (<>
    <p className="message">Message: {message}</p>
    <p className="created">Created: {new Date(created.toString() * 1000).toLocaleString()}</p>
  </>);
}
