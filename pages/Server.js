import Sidebar from "./sidebar/Sidebar.js";
import Server from "./server/Server.js";

export default function ServerPage() {
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
            <Sidebar />
            <Server />
        </div>
    );
}
