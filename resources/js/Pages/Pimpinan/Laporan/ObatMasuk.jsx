import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { Button, Modal } from "react-bootstrap";

export default function Index({
    auth,
    drugsIn,
    pageNumber = 1,
    paginate = 5,
    term,
    mulaiFilter,
    sampaiFilter,
}) {
    const [filterTerm, setFilterTerm] = useState("");
    const [show, setShow] = useState(false);

    const [mulai, setMulai] = useState(mulaiFilter);
    const [sampai, setSampai] = useState(sampaiFilter);
    const filter = (e) => {
        e.preventDefault();
        get(route("pimpinan.laporan.drugs-in", { mulai, sampai }), {
            onSuccess: () => {
                toast.success(`Berhasil Filter ${mulai} - ${sampai}`);
                setShowFilter(true);
            },
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { get, delete: destroy } = useForm();

    const handleSearch = () => {};
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Drugs In
                </h2>
            }
        >
            <Head title="Drugs" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Laporan / </span>
                    Obat Masuk
                    {mulaiFilter && (
                        <>
                            {". Di Filter Mulai Tanggal : "}
                            {mulaiFilter} <b>sampai</b> {sampaiFilter}
                        </>
                    )}
                </h4>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-sm-3 d-flex justify-between">
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={handleShow}
                                        >
                                            Filter
                                        </Button>
                                        {auth.user.roles[0].name !==
                                            "pimpinan" && (
                                            <a
                                                href={route(
                                                    "pimpinan.laporan.drugs-in.export",
                                                    {
                                                        mulai: mulai,
                                                        sampai: sampai,
                                                    }
                                                )}
                                                target="_blank"
                                                className="btn btn-primary btn-sm"
                                            >
                                                Export
                                            </a>
                                        )}
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
                                        <th>No.Invoice</th>
                                        <th>Tangal Masuk</th>
                                        <th>Kode Obat</th>
                                        <th>Nama Obat</th>
                                        <th>Jumlah</th>
                                        <th>Satuan</th>
                                        <th>Expired at</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {drugsIn.data.map((data, index) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.invoice}</td>
                                                <td>{data.tanggal_masuk}</td>
                                                <td>{data.kode}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.jumlah_masuk}</td>
                                                <td>{data.golongan}</td>
                                                <td>{data.expired_at}</td>
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
                                        drugsIn?.meta?.current_page
                                            ? drugsIn?.meta?.current_page
                                            : 0
                                    }
                                    itemsCountPerPage={
                                        drugsIn?.meta?.per_page
                                            ? drugsIn?.meta?.per_page
                                            : 0
                                    }
                                    totalItemsCount={
                                        drugsIn?.meta?.total
                                            ? drugsIn?.meta?.total
                                            : 0
                                    }
                                    onChange={(pageNumber) => {
                                        get(
                                            route("pimpinan.laporan.drugsIn", {
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

                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter</Modal.Title>
                </Modal.Header>
                <form onSubmit={filter}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Mulai
                            </label>
                            <input
                                type="date"
                                onChange={(e) => setMulai(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">
                                Sampai
                            </label>
                            <input
                                type="date"
                                onChange={(e) => setSampai(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Filter
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
