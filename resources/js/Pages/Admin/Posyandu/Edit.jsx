import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function Edit({ auth, pasien }) {
    const { data, setData, post, processing, errors, reset, get, put } =
        useForm({
            nama: pasien.nama,

            noTelepon: pasien.no_telepon,
            alamat: pasien.alamat,
        });

    const handleSave = (e) => {
        e.preventDefault();

        put(route("admin.master-data.posyandu.update", pasien.id), {
            onSuccess: () => {
                toast.success("Berhasil tambah posyandu ");
                reset();
            },
            onError: (err) => {
                console.log(err);
                toast.error("Gagal tambah posyandu  ");
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
            <Head title="Pasien Edit" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Master Data /{" "}
                                <Link
                                    href={route("admin.master-data.pasien")}
                                    className="text-light"
                                >
                                    Pasien
                                </Link>{" "}
                                /{" "}
                            </span>
                            Edit
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.master-data.pasien")}
                            className="py-2 mb-2 float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Show Data Pasien</h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form onSubmit={handleSave}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Nama
                                            </label>
                                            <input
                                                name="nama"
                                                id="nama"
                                                type="text"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.nama}
                                            />
                                            <span className="text-danger">
                                                {errors.nama}
                                            </span>
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                No Telepon
                                            </label>
                                            <input
                                                name="noTelepon"
                                                id="noTelepon"
                                                type="text"
                                                onChange={(e) =>
                                                    setData(
                                                        "noTelepon",
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                                value={data.noTelepon}
                                            />
                                            <span className="text-danger">
                                                {errors.noTelepon}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                                name="alamat"
                                                id="alamat"
                                                type="text"
                                                className="form-control"
                                                value={data.alamat}
                                            />
                                            <span className="text-danger">
                                                {errors.alamat}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Simpan Perubahan
                                    </button>
                                    <Link
                                        href={route(
                                            "admin.master-data.posyandu"
                                        )}
                                        className="btn btn-outline-secondary  float-right"
                                        type="button"
                                    >
                                        Cancel
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
