export default function Location({location}) {


    return (
        <div id="location">
            <h2>Location</h2>

            <table>
                <tr>
                    <th>Address</th>
                    <th>Distance</th>
                </tr>
                {location.map((lctn, index) => (
                    <tr key={index}>
                        <td>{lctn.addr}</td>
                        <td>{Math.round(lctn.dist*100)/100}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}


