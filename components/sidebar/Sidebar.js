import Item from "./item.js";
import Styles from "../../styles/Home.module.css";
import Header from "./header.js";

export default function Sidebar() {
    return (
        <div className={Styles.sidebar}>
            <Header />
            <Item message="Overview" link="/Overview" />
            <Item message="Servers" link="/Servers" />
            <Item message="Alerts" link="/Alerts" />
            <Item message="API Keys" link="/Keys" />
            <Item message="Settings" link="/Settings" />
        </div>
    );
}
