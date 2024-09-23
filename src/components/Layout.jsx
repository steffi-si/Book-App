import { Outlet } from "react-router-dom";
import HeaderView from "../views/HeaderView.jsx";

export default function Layout() {
    return (
        <>
            <HeaderView />
            <main>
                <Outlet />
            </main>
        </>
    );
}