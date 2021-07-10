//import Sidebar from "./sidebar/Sidebar.js";
//import Keys from "./Keys/Keys.js";

export default function keys() {
    const cookie = new Cookies();
    const token = cookie.get("logincookie");
    const router = useRouter();

    if (token == undefined || token == "ERROR") {
        useEffect(() => {
            router.push("/Login");
        });
    }

    return (
        <div className="wrapper">
            <h1>This page is currntly broken</h1>
        </div>
    );
}
