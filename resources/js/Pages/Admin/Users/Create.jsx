import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset, get } = useForm({
        name: "",
        email: "",
        alamat: "",
        noTelepon: "",
        position: "",
        password: "",
        password_confirmation: "",
    });

    const handleSave = (e) => {
        e.preventDefault();

        post(route("admin.users-management.store"), {
            onSuccess: () => {
                toast.success("Berhasil tambah user");
                reset();
            },
            onError: (err) => {
                toast.error("Gagal tambah user");
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
            <Head title="Users Create" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Master Data /{" "}
                                <Link
                                    href={route("admin.users-management")}
                                    className="text-light"
                                >
                                    Users
                                </Link>{" "}
                                /{" "}
                            </span>
                            Create
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.users-management")}
                            className="py-2 mb-2 float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Create A New User</h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form method="POST" onSubmit={handleSave}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="firstName"
                                                className="form-label"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={handleOnChange}
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.name}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                E-mail / Username
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="email"
                                                value={data.email}
                                                onChange={handleOnChange}
                                                placeholder="your_email@example.com"
                                            />
                                            <span className="text-danger">
                                                {errors.email}
                                            </span>
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                className="form-label"
                                                htmlFor="phoneNumber"
                                            >
                                                Phone Number
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <span className="input-group-text">
                                                    ID (+62)
                                                </span>
                                                <input
                                                    type="number"
                                                    name="noTelepon"
                                                    value={data.noTelepon}
                                                    onChange={handleOnChange}
                                                    className="form-control"
                                                    placeholder="202 555 0111"
                                                />
                                                <span className="text-danger">
                                                    {errors.noTelepon}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="address"
                                                className="form-label"
                                            >
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="alamat"
                                                value={data.alamat}
                                                onChange={handleOnChange}
                                                placeholder="Address"
                                            />
                                            <span className="text-danger">
                                                {errors.alamat}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="password"
                                                className="form-label"
                                            >
                                                password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={data.password}
                                                onChange={handleOnChange}
                                                placeholder="password"
                                            />
                                            <span className="text-danger">
                                                {errors.password}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="password_confirmation"
                                                className="form-label"
                                            >
                                                Password Confirmation
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={handleOnChange}
                                                placeholder="password"
                                            />
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="position"
                                                className="form-label"
                                            >
                                                Position
                                            </label>
                                            <select
                                                id="position"
                                                name="position"
                                                onChange={handleOnChange}
                                                className="select2 form-select"
                                                value={data.position}
                                            >
                                                <option value="">
                                                    Select Position
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="pimpinan">
                                                    Pimpinan
                                                </option>
                                                <option value="dokter">
                                                    Dokter
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="btn btn-primary me-2"
                                        >
                                            Save User
                                        </button>
                                        <Link
                                            href={route(
                                                "admin.users-management"
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
