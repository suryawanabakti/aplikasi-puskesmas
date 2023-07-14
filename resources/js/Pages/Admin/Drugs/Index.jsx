import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Dropdown, Offcanvas } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Pagination from "react-js-pagination";

export default function Index({
    auth,
    drugs,
    paginate,
    pageNumber,
    term,
    today,
}) {
    const { get, delete: destroy } = useForm();

    const [filterTerm, setFilterTerm] = useState(term);
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const handleClose = () => setShowAlertDelete(false);
    const handleSearch = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            get(
                route("admin.master-data.drugs", {
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
        destroy(route("admin.master-data.drugs.destroy", id), {
            onSuccess: () => {
                toast.success("Berhasil hapus obat");
            },
            onError: () => {},
        });

        setShowAlertDelete(false);
    };

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Obat
                </h2>
            }
        >
            <Head title="Drugs" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Master Data / </span>
                    Obat
                </h4>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Link
                                            href={route(
                                                "admin.master-data.drugs.create"
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className="bx bx-capsule"></i>{" "}
                                            Add Drug
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
                                        <th>Obat</th>
                                        <th>Harga Beli</th>
                                        <th>Harga Jual</th>
                                        <th>Stok</th>
                                        <th>Satuan</th>
                                        <th>Expired at</th>
                                        <th>Status </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {drugs.data.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "admin.master-data.drugs.show",
                                                            data.kode
                                                        )}
                                                    >
                                                        <strong className="text-dark">
                                                            {data.kode} -{" "}
                                                            {data.nama}
                                                        </strong>
                                                    </Link>
                                                </td>
                                                <td>
                                                    {rupiah(data.harga_beli)}
                                                </td>
                                                <td>
                                                    {rupiah(data.harga_jual)}
                                                </td>
                                                <td>{data.stok}</td>

                                                <td>{data.golongan}</td>
                                                <td>{data.expired_at}</td>
                                                <td>
                                                    {today >=
                                                    data.expired_at ? (
                                                        <span className="badge bg-danger">
                                                            EXPIRED
                                                        </span>
                                                    ) : data.kadaluarsa30HariLagi ? (
                                                        <span className="badge bg-warning">
                                                            {"< "}1 BLN EXPIRED
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-success">
                                                            BELUM EXPIRED
                                                        </span>
                                                    )}
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
                                                                    "admin.master-data.drugs.edit",
                                                                    data.kode
                                                                )}
                                                            >
                                                                <i className="bx bx-edit-alt"></i>{" "}
                                                                Edit
                                                            </Dropdown.Item>

                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleShowAlertDelete(
                                                                        data.nama,
                                                                        data.kode
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
                                        drugs?.meta?.current_page
                                            ? drugs?.meta?.current_page
                                            : 0
                                    }
                                    itemsCountPerPage={
                                        drugs?.meta?.per_page
                                            ? drugs?.meta?.per_page
                                            : 0
                                    }
                                    totalItemsCount={
                                        drugs?.meta?.total
                                            ? drugs?.meta?.total
                                            : 0
                                    }
                                    onChange={(pageNumber) => {
                                        get(
                                            route("admin.master-data.drugs", {
                                                page: pageNumber,
                                                paginate: paginate,
                                                term: term,
                                            })
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
                        Once you delete this account, there is no going back.
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
