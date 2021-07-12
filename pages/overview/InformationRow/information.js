import Styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function informationBox(props) {
    return (
        <Link href={props.Link}>
            <div className={Styles.informationBox}>
                <h1 className={Styles.informationBoxNumber}>{props.number}</h1>
                <h1 className={Styles.informationBoxTitle}>{props.title}</h1>
            </div>
        </Link>
    );
}
