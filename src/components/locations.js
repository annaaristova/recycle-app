import "../css-files/locations.css"

export default function Location({location}) {

    return (
        <div id="location">
            <p id="title">Locations</p>

            <table>
                <tr>
                    <td>Address</td>
                    <td>Distance</td>
                    <td>Time</td>
                </tr>
                {location.map((lctn, index) => (
                    <tr key={index}>
                        <td>{lctn.addr}</td>
                        <td>{Math.round(lctn.dist*100)/100}</td>
                        <td>{lctn.time}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}


