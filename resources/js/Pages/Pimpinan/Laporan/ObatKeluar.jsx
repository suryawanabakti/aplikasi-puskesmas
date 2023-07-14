import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-js-pagination";

export default function Index({
    auth,
    drugsOut,
    mulaiFilter,
    sampaiFilter,
    pageNumber = 1,
    paginate = 5,
}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mulai, setMulai] = useState(mulaiFilter);
    const [sampai, setSampai] = useState(sampaiFilter);

    const { flash } = usePage().props;

    const [filterTerm, setFilterTerm] = useState("");

    const { get, delete: destroy } = useForm();

    const handleSearch = () => {};
    const [showFilter, setShowFilter] = useState(false);
    const filter = (e) => {
        e.preventDefault();
        get(route("pimpinan.laporan.drugs-out", { mulai, sampai }), {
            onSuccess: () => {
                toast.success(`Berhasil Filter ${mulai} - ${sampai}`);
                setShowFilter(true);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Drugs Out
                </h2>
            }
        >
            <Head title="Drugs" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Laporan / </span>
                    Obat Keluar
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
                                        <a
                                            href={route(
                                                "pimpinan.laporan.drugs-out.export",
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
                                        <th>Tanggal</th>
                                        <th>Obat</th>
                                        <th>Pasien</th>
                                        <th>Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {drugsOut.data.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.invoice}</td>
                                                <td>{data.tanggal_keluar}</td>
                                                <td>{data.nama_obat}</td>
                                                <td>{data?.nama_pasien}</td>
                                                <td>{data.jumlah_keluar}</td>
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
                                        drugsOut?.meta?.current_page
                                            ? drugsOut?.meta?.current_page
                                            : 0
                                    }
                                    itemsCountPerPage={
                                        drugsOut?.meta?.per_page
                                            ? drugsOut?.meta?.per_page
                                            : 0
                                    }
                                    totalItemsCount={
                                        drugsOut?.meta?.total
                                            ? drugsOut?.meta?.total
                                            : 0
                                    }
                                    onChange={(pageNumber) => {
                                        get(
                                            route("pimpinan.laporan.drugsOut", {
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
