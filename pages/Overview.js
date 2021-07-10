import Sidebar from "./sidebar/Sidebar.js";
import Overview from "./overview/overview.js";

export default function OverviewPage() {
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
            <Overview />
        </div>
    );
}
