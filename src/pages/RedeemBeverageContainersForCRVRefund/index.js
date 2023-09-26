import Header from "../../components/header";
import Footer from "../../components/footer";
import Location from "../../components/location";
import "../../css-files/searchDiv.css";
import SearchBarAddress from "../../components/searchBarAddress";

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <div id="searchDiv">
                    <h2 id="searchDivFont">Redeem Beverage Containers For CRV Refund</h2>
                    <p>Bla bla bla</p>
                    <SearchBarAddress/>
                </div>
                <Location/>
            </main>
            <Footer/>
        </div>
    );
}