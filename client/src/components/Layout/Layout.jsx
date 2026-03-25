import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="font-outfit">
            <Navbar />
            <main className="min-h-[calc(100vh-200px)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
