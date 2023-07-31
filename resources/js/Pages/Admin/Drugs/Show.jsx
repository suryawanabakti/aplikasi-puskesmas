import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Show({ auth, golongan, drug }) {
    console.log(drug);
    const { data, setData, post, processing, errors, reset, get } = useForm({
        nama: drug.nama,
        stok: drug.stok,
        minStok: "",
        hargaBeli: drug.harga_beli,
        hargaJual: drug.harga_jual,
        kadaluarsa: drug.kadaluarsa,
        satuan: "",
        golongan: drug.golongan,
        kode: drug.kode,
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
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
            <Head title="Drugs Show" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Master Data /{" "}
                                <Link
                                    href={route("admin.master-data.drugs")}
                                    className="text-light"
                                >
                                    Drugs
                                </Link>{" "}
                                /{" "}
                            </span>
                            Show
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.master-data.drugs")}
                            className="py-2 mb-2 float-right fw-bold"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Lihat Obat</h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form method="POST">
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="kode"
                                                className="form-label"
                                            >
                                                Kode Obat
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="kode"
                                                name="kode"
                                                value={data.kode}
                                                autoFocus
                                                readOnly
                                            />
                                            <span className="text-danger">
                                                {errors.kode}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="nama"
                                                className="form-label"
                                            >
                                                Nama Obat
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="nama"
                                                readOnly
                                                name="nama"
                                                value={data.nama}
                                                onChange={handleOnChange}
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.nama}
                                            </span>
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="kadaluarsa"
                                                className="form-label"
                                            >
                                                Kadaluarsa
                                            </label>
                                            <input
                                                className="form-control"
                                                type="date"
                                                readOnly
                                                id="kadaluarsa"
                                                name="kadaluarsa"
                                                value={data.kadaluarsa}
                                                onChange={handleOnChange}
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.kadaluarsa}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="Golongan"
                                                className="form-label"
                                            >
                                                Golongan {drug.golongan}
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={data.golongan}
                                            />
                                            <span className="text-danger">
                                                {errors.golongan}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="hargaBeli"
                                                className="form-label"
                                            >
                                                Harga Beli
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                readOnly
                                                id="hargaBeli"
                                                name="hargaBeli"
                                                value={data.hargaBeli}
                                                onChange={handleOnChange}
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.hargaBeli}
                                            </span>
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="hargaJual"
                                                className="form-label"
                                            >
                                                Harga Jual
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                readOnly
                                                id="hargaJual"
                                                name="hargaJual"
                                                value={data.hargaJual}
                                                onChange={handleOnChange}
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.hargaJual}
                                            </span>
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                className="form-label"
                                                htmlFor="stok"
                                            >
                                                STOK
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    <i class="bx bxs-capsule"></i>
                                                </span>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    name="stok"
                                                    value={data.stok}
                                                    onChange={handleOnChange}
                                                    className="form-control"
                                                    placeholder="0"
                                                />
                                                <span className="text-danger">
                                                    {errors.stok}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
