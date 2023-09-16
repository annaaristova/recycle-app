import Navigation from './navigation'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div id="head">
            <Link to="/">
                <h1>Recycle Bay Area</h1>
            </Link>
            </div>
            <main>
                <Navigation/>
            </main>
        </>
    );
}