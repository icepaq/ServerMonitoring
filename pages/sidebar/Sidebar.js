import Item from "./item.js";
import Styles from "../../styles/Home.module.css";
import Header from "./header.js";

export default function Sidebar() {
    return (
        <div className={Styles.sidebar}>
            <Header />
            <Item message="Overview" />
            <Item message="Servers" />
            <Item message="Alerts" />
            <Item message="Mobile Alerts" />
            <Item message="API Keys" />
            <Item message="Pin Servers" />
            <Item message="Settings" />
        </div>
    );
}
