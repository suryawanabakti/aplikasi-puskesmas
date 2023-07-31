import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Dropdown, Nav, Offcanvas } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Alert } from "react-bootstrap";

export default function Index({ auth, drugsOut }) {
    const { flash } = usePage().props;

    const [filterTerm, setFilterTerm] = useState("");
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const handleClose = () => setShowAlertDelete(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const { get, delete: destroy } = useForm();

    const handleSearch = () => {};
    const handleShowAlertDelete = (name, id) => {
        setName(name);
        setId(id);
        setShowAlertDelete(true);
    };

    const handleDeleteData = (id) => {
        destroy(route("admin.transaction.drugs-out.destroy", id), {
            onSuccess: () => {
                toast.success("Berhasil hapus obat keluar");
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
                    Obat Keluar
                </h2>
            }
        >
            <Head title="Drugs" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Transactions / </span>
                    Obat Keluar
                </h4>
                {flash.type == "success" && (
                    <Alert key={"success"} variant={"success"} dismissible>
                        {flash.message}
                    </Alert>
                )}

                <div className="card">
                    {auth.user.roles[0].name == "admin" && (
                        <Nav
                            variant="tabs"
                            defaultActiveKey="/admin/transaction/drugs-out/dokter"
                        >
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    href="/admin/transaction/drugs-out"
                                >
                                    Admin
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    as={Link}
                                    href="/admin/transaction/drugs-out/dokter"
                                >
                                    Dokter
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    )}

                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7"></div>
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
                                        <th>No.Invoice</th>
                                        <th>Tanggal</th>
                                        <th>Obat</th>
                                        <th>Pasien</th>
                                        <th>Dokter</th>
                                        <th>Jumlah</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {drugsOut.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.invoice}</td>
                                                <td>{data.tanggal_keluar}</td>
                                                <td>{data.obat.nama}</td>
                                                <td>{data?.pasien?.nama}</td>
                                                <td>{data?.user?.name}</td>
                                                <td>{data.jumlah_keluar}</td>
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
                                                                        data.invoice,
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
