import Styles from "../../styles/Home.module.css";

export default function Item(props) {
    return <div className={Styles.sidebarItem}>{props.message}</div>;
}
