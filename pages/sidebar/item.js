import Styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Item(props) {
    return (
        <Link href={props.link}>
            <div className={Styles.sidebarItem}>{props.message}</div>
        </Link>
    );
}
