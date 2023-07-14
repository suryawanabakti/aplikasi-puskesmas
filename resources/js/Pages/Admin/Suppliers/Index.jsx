import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Dropdown, Offcanvas } from "react-bootstrap";

export default function Index({ auth, suppliers }) {
    const { get, delete: destroy } = useForm();

    const [filterTerm, setFilterTerm] = useState("");
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const handleShowAlertDelete = (name, id) => {
        setName(name);
        setId(id);
        setShowAlertDelete(true);
    };
    const handleDeleteData = (id) => {
        destroy(route("admin.master-data.suppliers.destroy", id), {
            onSuccess: () => {
                toast.success("Berhasil hapus suppliers");
            },
            onError: () => {
                alert("error");
            },
        });
        setShowAlertDelete(false);
    };
    const handleClose = () => setShowAlertDelete(false);
    console.log("@res", suppliers.data);
    const handleSearch = () => {};
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Suppliers
                </h2>
            }
        >
            <Head title="Suppliers" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Master Data / </span>
                    Suppliers
                </h4>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Link
                                            href={route(
                                                "admin.master-data.suppliers.create"
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className="bx bx-box"></i> Add
                                            Supplier
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
                                        <th>Nama Supplier</th>
                                        <th>Alamat</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {suppliers.data.map((data, index) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>
                                                    <strong className="text-dark">
                                                        {data.nama}
                                                    </strong>
                                                </td>
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
                                                                    "admin.master-data.drugs.edit",
                                                                    1
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

                            <br />
                            <br />
                            <br />
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
