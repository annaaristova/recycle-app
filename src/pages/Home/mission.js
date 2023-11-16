import "./missionDiv.css"
import mission from "../../images/mission.jpg"

export default function Mission({scrollToRecycle}) {

    return (
        <div id="mission">
            <img src={mission} alt="mission" id="mission-img"/>
            <p id="mission-text">Our mission is to transform recycling into a global movement that preserves natural resources, minimizes pollution, and secures a cleaner, greener future for generations to come.</p>
            <button className="learn-more-button" onClick={scrollToRecycle}>Learn More</button>
        </div>
    );
}

