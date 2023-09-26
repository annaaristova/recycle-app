import Navigation from './navigation'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div id="header">
            <Link to="/">
                <h1>Recycle Bay Area</h1>
            </Link>
            <Navigation/> 
        </div>
    );
}