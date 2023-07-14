import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Dropdown, Offcanvas } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Pagination from "react-js-pagination";

export default function Index({ auth, pasien, term, pageNumber, paginate }) {
    const { get, delete: destroy } = useForm();

    const [filterTerm, setFilterTerm] = useState("");
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const handleClose = () => setShowAlertDelete(false);
    const handleSearch = (event) => {
        if (event.key === "Enter") {
            get(
                route("admin.master-data.posyandu", {
                    term: event.target.value,
                })
            );
        }
    };

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const handleShowAlertDelete = (name, id) => {
        setName(name);
        setId(id);
        setShowAlertDelete(true);
    };

    const handleDeleteData = (id) => {
        destroy(route("admin.master-data.posyandu.destroy", id), {
            onSuccess: () => {
                toast.success("Berhasil hapus posyandu");
            },
            onError: () => {},
        });

        setShowAlertDelete(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posyandu
                </h2>
            }
        >
            <Head title="Posyandu" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Master Data / </span>
                    Posyandu
                </h4>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Link
                                            href={route(
                                                "admin.master-data.posyandu.create"
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className="bx bx-user"></i> Add
                                            Posyandu
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
                                        <th>Nama Tempat</th>
                                        <th>No.Telepon</th>
                                        <th>Alamat</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {pasien.data.map((data, index) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>
                                                    {" "}
                                                    <Link
                                                        href={route(
                                                            "admin.master-data.posyandu.show",
                                                            data.id
                                                        )}
                                                        className="text-dark"
                                                    >
                                                        <strong className="text-sm td-name">
                                                            {data.nama}
                                                        </strong>
                                                    </Link>
                                                </td>
                                                <td>{data.no_telepon}</td>
                                                <td>{data.alamat}</td>
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
                                                                    "admin.master-data.posyandu.edit",
                                                                    data.id
                                                                )}
                                                            >
                                                                <i className="bx bx-edit-alt"></i>{" "}
                                                                Edit
                                                            </Dropdown.Item>

                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleShowAlertDelete(
                                                                        data.nama,
                                                                        data.id
                                                                    )
                                                                }
                                                            >
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
                            <div className="mt-3 ms-2">
                                <Pagination
                                    linkClassName="page-link ms-1"
                                    activeLinkClassName="fw-bold text-dark"
                                    activePage={
                                        pasien?.meta?.current_page
                                            ? pasien?.meta?.current_page
                                            : 0
                                    }
                                    itemsCountPerPage={
                                        pasien?.meta?.per_page
                                            ? pasien?.meta?.per_page
                                            : 0
                                    }
                                    totalItemsCount={
                                        pasien?.meta?.total
                                            ? pasien?.meta?.total
                                            : 0
                                    }
                                    onChange={(pageNumber) => {
                                        get(
                                            route(
                                                "admin.master-data.posyandu",
                                                {
                                                    page: pageNumber,
                                                    paginate: paginate,
                                                    term: term,
                                                }
                                            )
                                        );
                                    }}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText={"First Page"}
                                    lastPageText={"Last Page"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Offcanvas
                show={showAlertDelete}
                onHide={handleClose}
                placement="top"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Apakah anda yakin menghapus data{" "}
                        <span className="text-capitalize fw-bold">{name}</span>{" "}
                        ini ?
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p className="mb-5">
                        Once you delete this data, there is no going back.
                        Please be certain.
                    </p>
                    <div className="">
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => handleDeleteData(id)}
                        >
                            <i className="bx bxs-trash"></i> Delete
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </AuthenticatedLayout>
    );
}
