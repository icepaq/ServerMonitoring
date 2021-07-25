import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
    const router = useRouter();
    useEffect(() => {
        router.push("/Login");
    });

    return <h1 className={styles.hi}>Hi</h1>;
}
