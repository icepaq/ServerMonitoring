import Styles from "../../styles/Server.module.css";

export default function ServerBox() {
    return (
        <input
            type="text"
            className={Styles.inputBox}
            placeholder="Filter servers"
        />
    );
}
