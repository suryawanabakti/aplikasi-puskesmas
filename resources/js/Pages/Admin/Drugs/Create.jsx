import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Create({ auth, golongan }) {
    const { data, setData, post, processing, errors, reset, get } = useForm({
        nama: "",
        stok: "",
        minStok: "",
        hargaBeli: "",
        hargaJual: "",
        kadaluarsa: "",
        satuan: "",
        golonganId: "",
        kode: "",
    });

    const handleSave = (e) => {
        e.preventDefault();

        post(route("admin.master-data.drugs.store"), {
            onSuccess: () => {
                toast.success("Berhasil tambah obat");
                reset();
            },
            onError: (err) => {
                console.log(err);
                toast.error("Gagal tambah obat");
            },
        });
    };

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
            <Head title="Drugs Create" />
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
                            Create
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.master-data.drugs")}
                            className="py-2 mb-2 float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Create A New Drug</h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form method="POST" onSubmit={handleSave}>
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
                                                onChange={handleOnChange}
                                                autoFocus
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
                                                Golongan
                                            </label>
                                            <select
                                                name="golonganId"
                                                id="golonganId"
                                                value={data.golonganId}
                                                onChange={handleOnChange}
                                                className="form-control"
                                            >
                                                <option value="">
                                                    Pilih Golongan
                                                </option>
                                                {golongan.map((data, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={data.id}
                                                        >
                                                            {data.nama}
                                                        </option>
                                                    );
                                                })}
                                            </select>
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
                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn btn-primary me-2"
                                        >
                                            Save Drug
                                        </button>
                                        <Link
                                            href={route(
                                                "admin.master-data.drugs"
                                            )}
                                            className="btn btn-outline-secondary"
                                        >
                                            Cancel
                                        </Link>
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
