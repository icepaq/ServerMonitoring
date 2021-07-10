import Styles from "../../styles/Home.module.css";

export default function Item(props) {
    return (
        <a href={props.link}>
            <div className={Styles.sidebarItem}>{props.message}</div>
        </a>
    );
}
