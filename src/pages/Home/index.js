import Header from "../../components/header";
import Mission from "./mission";
import Footer from "../../components/footer";
import  "../../css-files/base.css";
import { useRef } from 'react';
import SearchBarAddress from "./searchBarAddressForHome";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import "./index.css"
import searchSign from "../../images/searchSign.png"
import recycleImg from "../../images/bins1.jpg"
import crvImg from "../../images/bins2.jpg"

export default function Index() {

    const recycleDiv = useRef(null);

    const scrollToRecycle = () => {
        recycleDiv.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const render = (status) => {
        switch (status) {
          case Status.LOADING:
            return <h3>{status} ..</h3>;
          case Status.FAILURE:
            return <h3>{status} ..</h3>;
          case Status.SUCCESS:
            return <SearchBarAddress/>;
        }
    };

    return (
        <div id="container">
            <Header/>
            <main>
                <div id="wrapper">
                    <Mission scrollToRecycle={scrollToRecycle}/>
                    <div ref={recycleDiv} id="recycle-block">
                        <h2>Discover Nearby Donation and Recycling Centers</h2>
                        <p>Easily locate the closest donation or recycling centers for your items. Simply enter the item's name and hit 'Search' to find convenient locations for donation or recycling near you.</p>
                        <div className="item-search-wrapper">
                            <form>
                                <input className="item-search" type="text" placeholder="Search an Item"/>
                                <button className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
                            </form>
                        </div>
                        <img src={recycleImg} alt="bins" id="recycle-block-img"/>
                    </div>
                    <div id="container-block">
                        <h2>Get CRV Refunds with Ease</h2>
                        <p>Find Nearest Recycling Centers for Beverage Containers. Enter your address to discover the closest locations where you can recycle beverage containers and claim CRV refunds hassle-free.</p>
                        <Wrapper apiKey={""} libraries={["places"]} render={render}>
                            <SearchBarAddress/>
                        </Wrapper>
                        <img src={crvImg} alt="bins2" id="container-search-img"/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}