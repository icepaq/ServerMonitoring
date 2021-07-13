import Styles from "../../../styles/Server.module.css";
import Link from "next/link";

export default function ServerBox() {
    return (
        <Link href="/AddServer">
            <div className={Styles.addServerButton}>Add Server</div>
        </Link>
    );
}
