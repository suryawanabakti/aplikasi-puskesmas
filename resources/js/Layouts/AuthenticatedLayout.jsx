import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Toaster } from "react-hot-toast";

export default function Authenticated({ user, header, children }) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div
            id="bodyContainer"
            className={`light-style layout-menu-fixed layout-menu-100vh`}
            data-theme="theme-default"
            data-assets-path="/assets/"
            data-template="vertical-menu-template-free"
        >
            {/* Icons. Uncomment required icon fonts */}
            <link rel="stylesheet" href="/assets/vendor/fonts/boxicons.css" />
            {/* Core CSS */}
            <link rel="icon" type="image/x-icon" href="/assets/logo.ico"></link>
            <link
                rel="stylesheet"
                href="/assets/vendor/css/core.css"
                className="template-customizer-core-css"
            />
            <link
                rel="stylesheet"
                href="/assets/vendor/css/theme-default.css"
                className="template-customizer-theme-css"
            />
            <link rel="stylesheet" href="/assets/css/demo.css" />
            {/* Vendors CSS */}
            <link
                rel="stylesheet"
                href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
            />
            <link
                rel="stylesheet"
                href="/assets/vendor/libs/apex-charts/apex-charts.css"
            />
            <div className="layout-wrapper layout-content-navbar">
                <Toaster />

                <div className="layout-container">
                    <Sidebar user={user} />
                    <div className="layout-page">
                        <Topbar
                            user={user}
                            showMenu={showMenu}
                            setShowMenu={setShowMenu}
                        />
                        <div
                            className="content-wrapper"
                            onClick={() => setShowMenu(false)}
                        >
                            {children}
                            <footer className="content-footer footer bg-footer-theme">
                                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                                    <div className="mb-2 mb-md-0">
                                        © Pusekesmas Lumpue , made with ❤️ by{" "}
                                        <a
                                            href="https://www.instagram.com/clemyulpa/"
                                            target="_blank"
                                            className="footer-link fw-bolder"
                                        >
                                            ClemyUlpa
                                        </a>
                                    </div>
                                </div>
                            </footer>
                            <div className="content-backdrop fade" />
                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle" />
            </div>
        </div>
    );
}
