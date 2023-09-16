import Header from "../../components/header";
import RecycleSearch from "../../components/recycleSearch";
import Footer from "../../components/footer";
import Map from "../../components/map";
import Location from "../../components/location";

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <RecycleSearch/>
                <Map/>
                <Location/>
            </main>
            <Footer/>
        </div>
    );
}