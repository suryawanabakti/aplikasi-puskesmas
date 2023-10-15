import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function Show({ auth, pasien }) {
    const { data, setData, post, processing, errors, reset, get } = useForm({
        nama: "",
        nik: "",
        noTelepon: "",
        alamat: "",
        jenisKelamin: "",
    });

    const handleSave = (e) => {
        e.preventDefault();

        post(route("admin.master-data.pasien.store"), {
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
            <Head title="Pasien Show" />
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
                            Show
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
                                <form method="POST" onSubmit={handleSave}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                No.RM
                                            </label>
                                            <input
                                                name="noRM"
                                                id="noRM"
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={pasien.no_rm}
                                            />
                                        </div>
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
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                value={pasien.nama}
                                            />
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
                                                readOnly
                                                value={pasien.nik}
                                            />
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
                                                readOnly
                                                value={pasien.no_telepon}
                                            />
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
                                                readOnly
                                                className="form-control"
                                                value={pasien.alamat}
                                            />
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
                                                readOnly
                                                checked={
                                                    pasien.jenis_kelamin ==
                                                    "Laki-laki"
                                                }
                                                label="Laki-laki"
                                                name="group1"
                                                type={"radio"}
                                                id={`inline-${"radio"}-1`}
                                            />
                                            <Form.Check
                                                inline
                                                readOnly
                                                checked={
                                                    pasien.jenis_kelamin ==
                                                    "Perempuan"
                                                }
                                                label="Perempuan"
                                                name="group1"
                                                type={"radio"}
                                                id={`inline-${"radio"}-2`}
                                            />{" "}
                                            <br />
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
