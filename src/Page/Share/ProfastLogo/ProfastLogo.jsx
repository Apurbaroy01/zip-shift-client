import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png"
import "./Profast.css"

const ProfastLogo = () => {
    return (
        <Link to="/">
            <div className="flex items-end">
                <img className="mb-1" src={logo} alt="" />
                <p className="text-2xl -ml-4 bungee">Profast</p>
            </div>
        </Link>
    );
};

export default ProfastLogo;