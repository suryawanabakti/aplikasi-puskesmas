import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Sidebar({ user }) {
    const showSideBar = () => {
        document
            .getElementById("bodyContainer")
            .classList.remove("layout-menu-expanded");
    };

    const [menu, setMenu] = useState([
        {
            menuHeader: "Menu Apoteker",
            roles: ["super-admin", "apoteker"],
            menu: [
                {
                    id: "verifikasi",
                    menuTitle: "Verifikasi",
                    icon: "bx bx-layout",
                    core: "master-data",
                    menuItems: [
                        {
                            id: "verifObatMasuk",
                            routeName: "admin.verification.drugs-in",
                            link: "/admin/verification/drugs-in",
                            text: "Obat Masuk",
                        },
                        {
                            id: "verifObatKeluar",
                            routeName: "admin.master-data.drugs",
                            link: "/admin/master-data/drugs",
                            text: "Obat Keluar",
                        },
                    ],
                },
            ],
        },
        {
            menuHeader: "Menu Admin",
            roles: ["super-admin", "admin"],
            menu: [
                {
                    id: "masterData",
                    menuTitle: "Master Data",
                    icon: "bx bx-layout",
                    core: "master-data",
                    menuItems: [
                        {
                            id: "pasien",
                            routeName: "admin.master-data.pasien",
                            link: "/admin/master-data/pasien",
                            text: "Pasien",
                        },
                        {
                            id: "posyandu",
                            routeName: "admin.master-data.posyandu",
                            link: "/admin/master-data/posyandu",
                            text: "Posyandu/Pustu",
                        },
                        {
                            id: "drugs",
                            routeName: "admin.master-data.drugs",
                            link: "/admin/master-data/drugs",
                            text: "Stok Obat",
                        },
                        {
                            id: "suppliers",
                            routeName: "admin.master-data.suppliers",
                            link: "/admin/master-data/suppliers",
                            text: "Supplier",
                        },
                    ],
                },
                {
                    id: "Transaksi",
                    menuTitle: "Transaksi",
                    icon: "bx bxs-wallet",
                    core: "transaction",
                    menuItems: [
                        // {
                        //     id: "obatMasuk",
                        //     routeName: "admin.transaction.drugs-in",
                        //     link: "/admin/transaction/drugs-in",
                        //     text: "Obat Masuk",
                        // },
                        {
                            id: "obatKeluar",
                            routeName: "admin.transaction.drugs-out",
                            link: "/admin/transaction/grugs-out",
                            text: "Obat Keluar",
                        },
                    ],
                },

                {
                    id: "Laporan",
                    menuTitle: "Laporan",
                    icon: "bx bxs-report",
                    core: "laporan",
                    menuItems: [
                        {
                            id: "obatMasuk",
                            routeName: "admin.laporan.drugs-in",
                            link: "/admin/laporandrugs-in",
                            text: "Obat Masuk",
                        },
                        {
                            id: "obatKeluar",
                            routeName: "admin.laporan.drugs-out",
                            link: "/admin/laporan-drugs-out",
                            text: "Obat Keluar",
                        },
                        {
                            id: "obatKadaluarsa",
                            routeName: "admin.laporan.drugs-expired",
                            link: "/admin/laporan-drugs-expired",
                            text: "Obat Kadaluarsa",
                        },
                    ],
                },
                {
                    id: "usersManagement",
                    menuTitle: "Users Management",
                    icon: "bx bx-cog",
                    core: "admin.users-management",
                },
            ],
        },
        {
            menuHeader: "Menu Dokter",
            roles: ["super-admin", "dokter"],
            menu: [
                {
                    id: "Transaksi",
                    menuTitle: "Transaksi",
                    icon: "bx bxs-wallet",
                    core: "transaction",
                    menuItems: [
                        {
                            id: "obatKeluar",
                            routeName: "admin.transaction.drugs-out",
                            link: "/admin/transaction/grugs-out",
                            text: "Obat Keluar",
                        },
                    ],
                },
            ],
        },
        {
            menuHeader: "Menu Pimpinan",
            roles: ["super-admin", "pimpinan"],
            menu: [
                {
                    id: "Laporan",
                    menuTitle: "Laporan",
                    icon: "bx bxs-report",
                    core: "laporan",
                    menuItems: [
                        {
                            id: "obatMasuk",
                            routeName: "pimpinan.laporan.drugs-in",
                            link: "/pimpinan/laporandrugs-in",
                            text: "Obat Masuk",
                        },
                        {
                            id: "obatKeluar",
                            routeName: "pimpinan.laporan.drugs-out",
                            link: "/pimpinan/laporan-drugs-out",
                            text: "Obat Keluar",
                        },
                        {
                            id: "obatKadaluarsa",
                            routeName: "pimpinan.laporan.drugs-expired",
                            link: "/pimpinan/laporan-drugs-expired",
                            text: "Obat Kadaluarsa",
                        },
                    ],
                },
            ],
        },
        {
            menuHeader: "Misc",
            roles: ["admin", "user", "super-admin", "pimpinan"],
            menu: [
                {
                    id: "support",
                    menuTitle: "Support",
                    icon: "bx bx-support",
                    core: "support",
                },
            ],
        },
    ]);

    const showMenu = (id) => {
        if (document.getElementById(`${id}`).classList.contains("open")) {
            document.getElementById(`${id}`).classList.remove("open");
            document.getElementById(`${id}`).classList.remove("active");
        } else {
            document.getElementById(`${id}`).classList.add("open");
            document.getElementById(`${id}`).classList.add("active");
        }
    };

    useEffect(() => {
        setMenu(menu);
    }, []);

    return (
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
        >
            <div className="app-brand demo">
                <a href="#" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src="/logo.jpeg" width={35} alt="logo" />
                    </span>
                    <span className="app-brand-text demo menu-text fw-bolder ms-2">
                        Lumpue <br />
                    </span>
                </a>
                <a
                    href="#"
                    onClick={() => showSideBar()}
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                >
                    <i className="bx bx-chevron-left bx-sm align-middle" />
                </a>
            </div>
            <div className="menu-inner-shadow" />
            <ul className="menu-inner py-1">
                <li
                    className={`menu-item ${
                        route().current("dashboard") ? "active" : ""
                    }`}
                >
                    <NavLink href={route(`dashboard`)}>
                        <i className="menu-icon tf-icons bx bx-home-circle" />
                        <div data-i18n="Analytics">Dashboard</div>
                    </NavLink>
                </li>
                {menu.map((data, index) => {
                    const role = data.roles.find(
                        (role) => role === user.roles[0].name
                    );

                    if (role) {
                        return (
                            <React.Fragment key={index}>
                                <li
                                    className="menu-header small text-uppercase"
                                    key={index}
                                >
                                    <span className="menu-header-text">
                                        {data.menuHeader}
                                    </span>
                                </li>
                                {data.menu.map((data, index) => {
                                    if (route().current().includes(data.core)) {
                                        var active = true;
                                    } else {
                                        var active = false;
                                    }

                                    return (
                                        <li
                                            id={data.id}
                                            className={`menu-item ${
                                                active ? "open active" : ""
                                            }`}
                                            key={index}
                                        >
                                            {data.menuItems ? (
                                                <a
                                                    href="#"
                                                    onClick={() =>
                                                        showMenu(data.id)
                                                    }
                                                    className={`menu-link  menu-toggle`}
                                                >
                                                    <i
                                                        className={`menu-icon tf-icons ${data.icon}`}
                                                    ></i>
                                                    <div
                                                        data-i18n={
                                                            data.menuTitle
                                                        }
                                                    >
                                                        {data.menuTitle}
                                                    </div>
                                                </a>
                                            ) : (
                                                <NavLink
                                                    href={route(`${data.core}`)}
                                                >
                                                    <i
                                                        className={`menu-icon tf-icons ${data.icon}`}
                                                    />
                                                    <div
                                                        data-i18n={
                                                            data.menuTitle
                                                        }
                                                    >
                                                        {data.menuTitle}
                                                    </div>
                                                </NavLink>
                                            )}

                                            <ul className="menu-sub">
                                                {data.menuItems?.map(
                                                    (data, indexz) => {
                                                        if (
                                                            route()
                                                                .current()
                                                                .includes(
                                                                    data.routeName
                                                                )
                                                        ) {
                                                            var active = true;
                                                        } else {
                                                            var active = false;
                                                        }

                                                        return (
                                                            <li
                                                                className={`menu-item ${
                                                                    active
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                                key={indexz}
                                                            >
                                                                <NavLink
                                                                    href={route(
                                                                        `${data.routeName}`
                                                                    )}
                                                                >
                                                                    <div data-i18n="Without menu">
                                                                        {
                                                                            data.text
                                                                        }
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </React.Fragment>
                        );
                    }
                })}
            </ul>
        </aside>
    );
}
