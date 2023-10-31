import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div id="navWrapper">
            <nav>
                <div className="navHead">
                    <Link to="/Donate_Recycle" className="navLink">Recycle/Donate</Link>
                </div>
                <div className="navHead">
                    <Link to="/RecycleGuide" className="navLink">Recycle Guide</Link>
                </div>
                <div className="navHead">
                    <Link to="/Redeem_Bev_Containers" className="navLink">Redeem Beverage Containers</Link>
                </div>
            </nav>
        </div>
    );
}