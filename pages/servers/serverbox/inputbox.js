import Styles from "../../../styles/Home.module.css";

export default function ServerBox() {
    return (
        <input
            type="text"
            className={Styles.input}
            placeholder="Filter servers"
        />
    );
}
