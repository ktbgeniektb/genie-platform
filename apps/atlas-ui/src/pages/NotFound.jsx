import { Link } from "react-router-dom";
export default function NotFound(){
  return (
    <div>
      <h1>404 Not Found</h1>
      <p><Link to="/students">Go Students</Link></p>
    </div>
  );
}