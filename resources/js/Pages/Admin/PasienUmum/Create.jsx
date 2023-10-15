import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function Create({ auth, golongan, noRM }) {
    const { data, setData, post, processing, errors, reset, get } = useForm({
        nama: "",
        nik: "",
        noTelepon: "",
        alamat: "",
        jenisKelamin: "",
    });

    const handleSave = (e) => {
        e.preventDefault();

        post(route("admin.master-data.pasien-umum.store"), {
            onSuccess: () => {
                toast.success("Berhasil tambah pasien");
                reset();
            },
            onError: (err) => {
                console.log(err);
                toast.error("Gagal tambah pasien");
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
            <Head title="Pasien Create" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Master Data /{" "}
                                <Link
                                    href={route(
                                        "admin.master-data.pasien-umum"
                                    )}
                                    className="text-light"
                                >
                                    Pasien Umum
                                </Link>{" "}
                                /{" "}
                            </span>
                            Create
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.master-data.pasien-umum")}
                            className="py-2 mb-2 float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Create A New Pasien</h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form method="POST" onSubmit={handleSave}>
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
                                                NIK
                                            </label>
                                            <input
                                                name="nik"
                                                id="nik"
                                                type="text"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setData(
                                                        "nik",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.nik}
                                            />
                                            <span className="text-danger">
                                                {errors.nik}
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
                                                className="form-control"
                                                onChange={(e) =>
                                                    setData(
                                                        "noTelepon",
                                                        e.target.value
                                                    )
                                                }
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
                                                name="alamat"
                                                id="alamat"
                                                type="text"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                                value={data.alamat}
                                            />
                                            <span className="text-danger">
                                                {errors.alamat}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor=""
                                                className="form-label d-block "
                                            >
                                                Jenis Kelamin
                                            </label>
                                            <Form.Check
                                                inline
                                                onClick={() =>
                                                    setData(
                                                        "jenisKelamin",
                                                        "Laki-laki"
                                                    )
                                                }
                                                label="Laki-laki"
                                                name="group1"
                                                type={"radio"}
                                                id={`inline-${"radio"}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                onClick={() =>
                                                    setData(
                                                        "jenisKelamin",
                                                        "Perempuan"
                                                    )
                                                }
                                                label="Perempuan"
                                                name="group1"
                                                type={"radio"}
                                                id={`inline-${"radio"}-2`}
                                            />{" "}
                                            <br />
                                            <span className="text-danger">
                                                {errors.jenisKelamin}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn btn-primary me-2"
                                        >
                                            Simpan Pasien
                                        </button>
                                        <Link
                                            href={route(
                                                "admin.master-data.pasien-umum"
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
