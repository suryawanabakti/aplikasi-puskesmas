import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset, get } = useForm({
        nama: "",
        alamat: "",
        kode: "",
    });

    const handleSave = (e) => {
        e.preventDefault();

        post(route("admin.master-data.suppliers.store"), {
            onSuccess: () => {
                toast.success("Berhasil tambah supplier");
                reset();
            },
            onError: (err) => {
                toast.error("Gagal tambah supplier");
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
                    Suppliers
                </h2>
            }
        >
            <Head title="Supplier Create" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Master Data /{" "}
                                <Link
                                    href={route("admin.master-data.suppliers")}
                                    className="text-light"
                                >
                                    Suppliers
                                </Link>{" "}
                                /{" "}
                            </span>
                            Create
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.master-data.suppliers")}
                            className="py-2 mb-2 float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">
                                Create A New Supplier
                            </h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form method="POST" onSubmit={handleSave}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="kode"
                                                className="form-label"
                                            >
                                                Kode Supplier
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
                                                Nama Supplier
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
                                                htmlFor="alamat"
                                                className="form-label"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="alamat"
                                                name="alamat"
                                                value={data.alamat}
                                                onChange={handleOnChange}
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.alamat}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn btn-primary me-2"
                                        >
                                            Save Supplier
                                        </button>
                                        <Link
                                            href={route(
                                                "admin.master-data.suppliers"
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
