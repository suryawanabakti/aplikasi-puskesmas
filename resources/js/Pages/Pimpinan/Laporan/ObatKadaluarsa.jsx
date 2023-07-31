import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { Button, Modal } from "react-bootstrap";

export default function ObatKadaluarsa({
    auth,
    drugs,
    pageNumber = 1,
    paginate = 5,
    term,
    mulaiFilter,
    sampaiFilter,
    today,
}) {
    const [filterTerm, setFilterTerm] = useState("");
    const [show, setShow] = useState(false);

    const [mulai, setMulai] = useState(mulaiFilter);
    const [sampai, setSampai] = useState(sampaiFilter);
    const filter = (e) => {
        e.preventDefault();
        get(route("pimpinan.laporan.drugs-expired", { mulai, sampai }), {
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
                    Drugs Expired
                </h2>
            }
        >
            <Head title="Drugs" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-2 mb-2">
                    <span className="text-muted fw-light">Laporan / </span>
                    Obat Kadaluarsa
                </h4>

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-sm-3 d-flex justify-between">
                                        {auth.user.roles[0].name !==
                                            "pimpinan" && (
                                            <a
                                                href={route(
                                                    "pimpinan.laporan.drugs-expired.export",
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
                                        <th>Nama Obat</th>
                                        <th>Expired</th>
                                        <th>Stok</th>
                                        <th>Harga Satuan</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {drugs.data.map((data) => {
                                        return (
                                            today >= data.expired_at && (
                                                <tr key={data.id}>
                                                    <td>{data.nama}</td>
                                                    <td>{data.expired_at}</td>
                                                    <td>{data.stok}</td>
                                                    <td>
                                                        {rupiah(
                                                            data.harga_jual
                                                        )}
                                                    </td>
                                                    <td>
                                                        {rupiah(
                                                            data.stok *
                                                                data.harga_jual
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="mt-3 ms-2"></div>

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
