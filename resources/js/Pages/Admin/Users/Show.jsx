import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ auth, user }) {
    const { data, setData, post, processing, errors, reset, get, patch } =
        useForm({
            name: user.name,
            email: user.email,
            no_telepon: user.no_telepon,
            alamat: user.alamat,
        });
    const [selectedImage, setSelectedImage] = useState();

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onSuccess: () => {
                toast.success("Berhasil simpan profile");
                reset();
            },
            onError: (err) => {
                console.log(err);
                toast.error("Gagal simpan profile");
            },
        });
    };

    const removeSelectedImage = () => {
        setSelectedImage();
    };
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users Create" />
            <div className="container-xxl flex-grow-1 container-p-y">
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
                            className="py-2 mb-2 float-right fw-bold"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-start align-items-sm-center gap-4">
                                    {selectedImage ? (
                                        <img
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            alt="user-avatar"
                                            className="d-block rounded"
                                            height="100"
                                            width="100"
                                            id="uploadedAvatar"
                                        />
                                    ) : (
                                        <img
                                            src="/assets/img/avatars/clemy.png"
                                            alt="user-avatar"
                                            className="d-block rounded"
                                            height="100"
                                            width="100"
                                            id="uploadedAvatar"
                                        />
                                    )}
                                </div>
                            </div>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form>
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
                                                readOnly
                                                required
                                                id="firstName"
                                                name="firstName"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                autoFocus
                                            />
                                            <span className="text-danger">
                                                {errors.name}
                                            </span>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="firstName"
                                                className="form-label"
                                            >
                                                UUID
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                readOnly
                                                value={user.uuid}
                                                autoFocus
                                            />
                                        </div>

                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                E-mail
                                            </label>
                                            <input
                                                readOnly
                                                className="form-control"
                                                type="text"
                                                required
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
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
                                                <input
                                                    readOnly
                                                    type="text"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={data.no_telepon}
                                                    onChange={(e) =>
                                                        setData(
                                                            "no_telepon",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                    placeholder="202 555 0111"
                                                />
                                                <span className="text-danger">
                                                    {errors.no_telepon}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="alamat"
                                                className="form-label"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                value={data.alamat}
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Alamat"
                                            />
                                            <span className="text-danger">
                                                {errors.alamat}
                                            </span>
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
