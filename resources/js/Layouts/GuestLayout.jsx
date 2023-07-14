import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

export default function Guest({ children }) {
    return (
        <>
            <Head title="Login" />

            <link
                href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                rel="stylesheet"
            />
            {/* Icons. Uncomment required icon fonts */}
            <link rel="stylesheet" href="/assets/vendor/fonts/boxicons.css" />
            {/* Core CSS */}
            <link
                rel="stylesheet"
                href="/assets/vendor/css/core.css"
                className="template-customizer-core-css"
            />
            <link rel="icon" type="image/x-icon" href="/logo.ico"></link>
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
            {/* Page CSS */}
            {/* Page */}
            <link
                rel="stylesheet"
                href="/assets/vendor/css/pages/page-auth.css"
            />
            <Toaster />
            {/* Helpers */}
            {/*! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section */}
            {/*? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  */}

            {children}
        </>
    );
}
