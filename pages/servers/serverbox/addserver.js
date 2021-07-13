import Styles from "../../../styles/Server.module.css";

export default function ServerBox() {
    return (
        <Link href="/AddServer">
            <div className={Styles.addServerButton}>Add Server</div>;
        </Link>
    );
}
