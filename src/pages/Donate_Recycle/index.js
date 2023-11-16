import Header from "../../components/header";
import Footer from "../../components/footer";
import SearchItem from "../../components/searchItemRecyclePage";
import "./index.css"

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <div id="recycle-img">
                    <h2 id="searchDivFont">Donate or Recycle</h2>
                    <p>Bla bla bla</p>
                    <SearchItem/>
                </div>
            </main>
            <Footer/>
        </div>
    );
}