import Header from "../../components/header";
import Mission from "./mission";
import PopularSearch from "./popularSearches";
import Footer from "../../components/footer";
import ItemsCRVRefund from "./itemsForRefund";
import  "../../css-files/base.css";
import "./recycleSearch.css";
import "./sections.css";
import { useRef } from 'react';
import SearchItem from "../../components/searchItem";
import recycle from "../../images/recycle.png";
import SearchBarAddress from "./searchBarAddressForHome";
import "./redeemContainerSearch.css";
import "./guideSearch.css";
import "./recycleSearch.css"


export default function Index() {

    const recycleOrDonate = useRef(null);
    const recycleGuide = useRef(null);
    const redeemCnt = useRef(null);

    function scrollToRecycle(){
        recycleOrDonate.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToGuide(){
        recycleGuide.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToRedeem(){
        redeemCnt.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div id="container">
            <Header/>
            <main>
                <Mission/>
                <div id="sections">
                    <div id="recycle">
                        <button className="sectionName" onClick={scrollToRecycle}><h2>Recycle/Donate</h2></button>
                        <button className="sectionImageBtn" onClick={scrollToRecycle}>
                            <img src={recycle} alt="Recycle" className="sectionImage"/>
                        </button>
                    </div>
                    <div id="guide">
                        <button className="sectionName" onClick={scrollToGuide}><h2>Recycle Guide</h2></button>
                        <button className="sectionImageBtn" onClick={scrollToGuide}>
                            <img src="images/test1.jpg" alt="Recycle" className="sectionImage"/>
                        </button>
                    </div>
                    <div id="redeem">
                        <button className="sectionName" onClick={scrollToRedeem}><h2>Redeem Beverage Containers</h2></button>
                        <button className="sectionImageBtn" onClick={scrollToRedeem}>
                            <img src={"images/redeemContainers.png"} alt="Redeem" className="sectionImage"/>
                        </button>
                    </div>
                </div>
                <div ref={recycleOrDonate} id="recycleSearch">
                    <h2>Donate or Recycle</h2>
                    <p>Bla bla bla</p>
                    <SearchItem/>
                </div>
                <PopularSearch/>
                <div ref={recycleGuide} id="guideSearch">
                    <h2>Recycle Guide</h2>
                    <p>Bla bla bla</p>
                    <SearchItem/>
                </div>
                <PopularSearch/>
                <div ref={redeemCnt} id="redeemContainerSearch">
                    <h2>Redeem Beverage Containers</h2>
                    <p>Bla bla bla</p>
                    <SearchBarAddress/>
                </div>
                <ItemsCRVRefund/>
            </main>
            <Footer/>
        </div>
    );
}