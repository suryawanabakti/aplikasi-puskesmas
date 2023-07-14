import React from "react";

export default function ErrorLayout({ user, header, children }) {
    return (
        <div
            id=""
            lang="en"
            class="light-style"
            dir="ltr"
            data-theme="theme-default"
            data-assets-path="/assets/"
            data-template="vertical-menu-template-free"
        >
            {/* Icons. Uncomment required icon fonts */}
            <link rel="stylesheet" href="/assets/vendor/fonts/boxicons.css" />
            {/* Core CSS */}
            <link
                rel="icon"
                type="image/x-icon"
                href="/assets/img/favicon/favicon.ico"
            ></link>
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
            <body>{children}</body>
        </div>
    );
}
