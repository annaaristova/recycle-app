import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div id="navWrapper">
            <nav>
                <div className="navHead">
                    <Link to="/DonateOrRecycle">Recycle/Donate</Link>
                </div>
                <div className="navHead">
                    <Link to="/RecycleGuide">Recycle Guide</Link>
                </div>
                <div className="navHead">
                    <Link to="/RedeemBeverageContainersForCRVRefund">Redeem Beverage Containers</Link>
                </div>
            </nav>
        </div>
    );
}