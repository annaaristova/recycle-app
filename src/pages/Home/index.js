import Header from "../../components/header";
import Mission from "./mission";
import Sections from "./sections";
import RecycleSearch from "../../components/recycleSearch";
import PopularSearch from "./popularSearches";
import Footer from "../../components/footer";
import GuideSearch from "./guideSearch";
import ItemsCRVRefund from "./itemsForRefund";
import RedeemContainerSearch from "../../components/redeemContainersSeacrh";

export default function Index() {
    return (
        <div id="container">
            <Header/>
            <main>
                <Mission/>
                <Sections/>
                <RecycleSearch/>
                <PopularSearch/>
                <GuideSearch/>
                <ItemsCRVRefund/>
                <RedeemContainerSearch/>
            </main>
            <Footer/>
        </div>
    );
}