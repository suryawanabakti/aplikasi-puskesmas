import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-js-pagination";
import NavLink from "@/Components/NavLink";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function Index({
    auth,
    users,
    pageNumber = 1,
    paginate = 5,
    term = "",
    filterPositions = "",
}) {
    const [showAlertDelete, setShowAlertDelete] = useState(false);

    const handleClose = () => setShowAlertDelete(false);
    const handleShow = () => setShowAlertDelete(true);

    const [showModal, setShowModal] = useState(false);

    const handleCloseFilter = () => setShowModal(false);
    const handleShowFilter = () => setShowModal(true);

    const { get, delete: destroy } = useForm();

    const [name, setName] = useState("");
    const [uuid, setUuid] = useState("");
    const [position, setPosition] = useState("");

    const [filterPosition, setFilterPosition] = useState(filterPositions);
    const [filterTerm, setFilterTerm] = useState(term);

    const handleFilter = (e) => {
        e.preventDefault();
        get(route("admin.users-management", { filterPosition }));
    };

    const handleShowAlertDelete = (user) => {
        setShowAlertDelete(true);
        setName(user.name);
        setPosition(user.position);
        setUuid(user.uuid);
    };

    const handleDeleteAccount = (uuid) => {
        destroy(route("admin.users-management.destroy", uuid), {
            onSuccess: () => {
                toast.success("Berhasil hapus user");
            },
            onError: () => {},
        });

        setShowAlertDelete(false);
    };

    const handleClickPaginate = (paginate) => {
        get(
            route("admin.users-management", {
                page: pageNumber,
                paginate: paginate,
            })
        );
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            get(
                route("admin.users-management", {
                    page: 1,
                    paginate: paginate,
                    term: event.target.value,
                })
            );
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Master Data / </span>
                    Users
                </h4>

                {/* Hoverable Table rows */}
                <div className="card">
                    <h5 className="card-header ">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row mb-1 text-center">
                                    <div className="col-sm-3 mt-1">
                                        {" "}
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="primary"
                                                size="sm"
                                            >
                                                Lihat {paginate ? paginate : 5}{" "}
                                                Data
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleClickPaginate(5)
                                                    }
                                                >
                                                    Lihat 5 Data
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleClickPaginate(10)
                                                    }
                                                >
                                                    Lihat 10 Data
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleClickPaginate(20)
                                                    }
                                                >
                                                    Lihat 20 Data
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="col-sm-3 mt-1">
                                        {" "}
                                        <Link
                                            href={route(
                                                "admin.users-management.create"
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <i className="bx bx-user-plus"></i>{" "}
                                            Add Data
                                        </Link>
                                    </div>
                                    <div className="col-sm-3 col-sm-3  mt-1">
                                        {" "}
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => setShowModal(true)}
                                        >
                                            <i className="bx bx-filter-alt"></i>{" "}
                                            Filter
                                        </button>
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
                    </h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th>Status</th>
                                    <th>Last Seen</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {users?.data?.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td width="250px">
                                                <div className="users-list">
                                                    <Link
                                                        href={route(
                                                            "admin.users-management.show",
                                                            user.uuid
                                                        )}
                                                        className="text-dark"
                                                    >
                                                        <strong className="text-sm td-name">
                                                            {user.name}
                                                        </strong>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.position}</td>
                                            <td>
                                                {user.status ? (
                                                    <span className="badge bg-label-success">
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-label-danger">
                                                        Offline
                                                    </span>
                                                )}
                                            </td>
                                            <td>{user.last_seen}</td>
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
                                                                "admin.users-management.edit",
                                                                user.uuid
                                                            )}
                                                        >
                                                            <i className="bx bx-edit-alt"></i>{" "}
                                                            Edit
                                                        </Dropdown.Item>

                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                handleShowAlertDelete(
                                                                    user
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
                        <div className="mt-3 ms-2 ">
                            <Pagination
                                linkClassName="page-link ms-1"
                                activeLinkClassName="fw-bold text-dark"
                                activePage={
                                    users?.meta?.current_page
                                        ? users?.meta?.current_page
                                        : 0
                                }
                                itemsCountPerPage={
                                    users?.meta?.per_page
                                        ? users?.meta?.per_page
                                        : 0
                                }
                                totalItemsCount={
                                    users?.meta?.total ? users?.meta?.total : 0
                                }
                                onChange={(pageNumber) => {
                                    get(
                                        route("admin.users-management", {
                                            page: pageNumber,
                                            paginate: paginate,
                                            term: term,
                                            filterPosition: filterPosition,
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

            <Modal show={showModal} onHide={handleCloseFilter}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">
                            Position
                        </label>
                        <select
                            value={filterPosition}
                            onChange={(e) => setFilterPosition(e.target.value)}
                            className="form-control"
                        >
                            <option value="">All Position</option>
                            <option value="apoteker">apoteker</option>
                            <option value="pimpinan">pimpinan</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFilter}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleFilter(e)}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>

            <Offcanvas
                show={showAlertDelete}
                onHide={handleClose}
                placement="top"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Are you sure you want to delete{" "}
                        <span className="text-capitalize fw-bold">{name}</span>{" "}
                        account ?
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
                            onClick={() => handleDeleteAccount(uuid)}
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
