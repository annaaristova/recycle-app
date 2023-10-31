import Header from "../../components/header";
import Footer from "../../components/footer";
import SearchBarItem from "../../components/searchItem";
import "../../css-files/searchDiv.css";

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <div id="searchDiv">
                    <h2 id="searchDivFont">Recycle Guide</h2>
                    <p>Bla bla bla</p>
                    <SearchBarItem/>
                </div>
            </main>
            <Footer/>
        </div>
    );
}