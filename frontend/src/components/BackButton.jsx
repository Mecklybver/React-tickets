import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


function BackButton({url}) {
  return (
    <Link to={url ? url : "/"} className="btn btn-reverse btn-back">
      <FaArrowAltCircleLeft /> Back
    </Link>
  );
}
export default BackButton
