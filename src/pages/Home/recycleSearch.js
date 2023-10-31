import SearchBarItem from "../../components/searchBarItem";
import "./recycleSearch";
import recycleOrDonate from "./index";


export default function RecycleSearch() {

    return (
        <div ref={recycleOrDonate} id="recycleSearch">
            <h2>Donate or Recycle</h2>
            <p>Bla bla bla</p>
            <SearchBarItem/>
        </div>
    );
}
