import Header from "../../components/header";
import RedeemContainerSearch from "../../components/redeemContainersSeacrh";
import Footer from "../../components/footer";
import Map from "../../components/map";
import Location from "../../components/location";

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <RedeemContainerSearch/>
                <Map/>
                <Location/>
            </main>
            <Footer/>
        </div>
    );
}