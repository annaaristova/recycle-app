import recycle from "../../images/recycle.png";
import scrollToRecycle from "./index";

export default function RecycleSection() {

    return (
        <div id="recycle">
            <h2>Recycle/Donate</h2>
            <button onClick={scrollToRecycle}>
                <img src={recycle} className="sectionImage" alt="Recycle"/>
            </button>
        </div>
    );
}
