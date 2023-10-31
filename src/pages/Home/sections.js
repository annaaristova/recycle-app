import recycle from "../../images/recycle.png";
import "./sections.css";

export default function Sections() {

    return (
        <div id="sections">
            <div id="recycle">
                <h2>Recycle/Donate</h2>
                <button>
                    <img src={recycle} className="sectionImage" alt="Recycle"/>
                </button>
            </div>

            <div id="guide">
                <h2>Recycle Guide</h2>
                <button>
                    <img src="images/test1.jpg" className="sectionImage" alt="Recycle"/>
                </button>
            </div>

            <div id="redeem">
                <h2>Redeem Beverage Containers</h2>
                <button>
                    <img src={"images/redeemContainers.png"} className="sectionImage" alt="Redeem"/>
                </button>
            </div>
        </div>
    );
}
