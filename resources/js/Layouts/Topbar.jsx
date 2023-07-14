import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Topbar({
    user,
    setLayoutExpanded,
    showMenu,
    setShowMenu,
}) {
    const showSideBar = () => {
        document
            .getElementById("bodyContainer")
            .classList.add("layout-menu-expanded");
    };

    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a
                    onClick={() => showSideBar()}
                    className="nav-item nav-link px-0 me-xl-4"
                    href="#"
                >
                    <i className="bx bx-menu bx-sm" />
                </a>
            </div>
            <div
                className="navbar-nav-right d-flex align-items-center"
                id="navbar-collapse"
            >
                {/* Search */}
                <div className="navbar-nav align-items-center">
                    <div className="nav-item d-flex align-items-center">
                        <i className="bx bx-search fs-4 lh-0" />
                        <input
                            type="text"
                            className="form-control border-0 shadow-none"
                            placeholder="Search..."
                            aria-label="Search..."
                        />
                    </div>
                </div>
                {/* /Search */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    {/* Place this tag where you want the button to render. */}
                    <li className="nav-item lh-1 me-3"></li>
                    {/* User */}

                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a
                            onClick={(e) => setShowMenu(!showMenu)}
                            className={`nav-link dropdown-toggle hide-arrow ${
                                showMenu && "show"
                            }`}
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <div className="avatar avatar-online">
                                <img
                                    src="/assets/img/avatars/clemy.png"
                                    alt=""
                                    className="w-px-40 h-auto rounded-circle"
                                />
                            </div>
                        </a>
                        <ul
                            className={`dropdown-menu dropdown-menu-end ${
                                showMenu && "show"
                            }`}
                            data-bs-popper
                        >
                            <li>
                                <Link className="dropdown-item" href="/profile">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img
                                                    src="/assets/img/avatars/clemy.png"
                                                    alt=""
                                                    className="w-px-40 h-auto rounded-circle"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-semibold d-block">
                                                {user.name}
                                            </span>
                                            <small className="text-muted text-capitalize">
                                                {user.roles[0].name}
                                            </small>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="dropdown-divider" />
                            </li>
                            <li>
                                <Link className="dropdown-item" href="/profile">
                                    <i className="bx bx-user me-2" />
                                    <span className="align-middle">
                                        My Profile
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-cog me-2" />
                                    <span className="align-middle">
                                        Settings
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <span className="d-flex align-items-center align-middle">
                                        <i className="flex-shrink-0 bx bx-bell me-2" />
                                        <span className="flex-grow-1 align-middle">
                                            Notification
                                        </span>
                                        <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                                            4
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider" />
                            </li>
                            <li>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="dropdown-item"
                                >
                                    <i className="bx bx-power-off me-2" />
                                    <span className="align-middle">
                                        Log Out
                                    </span>
                                </ResponsiveNavLink>
                            </li>
                        </ul>
                    </li>
                    {/*/ User */}
                </ul>
            </div>
        </nav>
    );
}
