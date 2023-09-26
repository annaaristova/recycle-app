import mission from "../../images/mission.jpg"
import "./missionDiv.css"

export default function Mission() {
    return (
        <div id="mission">
            <p>Our mission is bla bla...</p>
            <img src={mission} alt="Our Mission"/>
        </div>
    );
}

