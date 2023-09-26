import Header from "../../components/header";
import Footer from "../../components/footer";
//import Map from "../../components/map";
import Location from "../../components/location";
import SearchBarItem from "../../components/searchBarItem";
import "../../css-files/searchDiv.css";

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <div id="searchDiv">
                    <h2 id="searchDivFont">Donate or Recycle</h2>
                    <p>Bla bla bla</p>
                    <SearchBarItem/>
                </div>
                
                <Location/>
            </main>
            <Footer/>
        </div>
    );
}