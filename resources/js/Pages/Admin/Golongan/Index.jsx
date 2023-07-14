import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Dropdown } from "react-bootstrap";

export default function Index({ auth, golongan }) {
    const [filterTerm, setFilterTerm] = useState("");
    console.log("@res", golongan.data);
    const handleSearch = () => {};
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Satuan
                </h2>
            }
        >
            <Head title="Satuan" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Master Data / </span>
                    Satuan
                </h4>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Link
                                            href={route(
                                                "admin.master-data.golongan.create"
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className="bx bx-box"></i> Add
                                            Golongan
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4">
                                <div className="input-group input-group-merge">
                                    <span
                                        className="input-group-text"
                                        id="basic-addon-search31"
                                    >
                                        <i className="bx bx-search"></i>
                                    </span>
                                    <input
                                        onKeyDown={handleSearch}
                                        type="text"
                                        value={filterTerm}
                                        onChange={(e) =>
                                            setFilterTerm(e.target.value)
                                        }
                                        className="form-control"
                                        placeholder="Search..."
                                        aria-label="Search..."
                                        aria-describedby="basic-addon-search31"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive text-nowrap">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama Satuan</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {golongan.map((data) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <strong className="text-dark">
                                                        {data.nama}
                                                    </strong>
                                                </td>

                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            variant="light"
                                                            id="dropdown-basic"
                                                            className="btn p-0 dropdown-toggle hide-arrow"
                                                        >
                                                            <i className="bx bx-dots-vertical-rounded"></i>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item
                                                                as={Link}
                                                                href={route(
                                                                    "admin.master-data.golongan.edit",
                                                                    1
                                                                )}
                                                            >
                                                                <i className="bx bx-edit-alt"></i>{" "}
                                                                Edit
                                                            </Dropdown.Item>

                                                            <Dropdown.Item>
                                                                <i className="bx bx-trash me-1"></i>
                                                                Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
