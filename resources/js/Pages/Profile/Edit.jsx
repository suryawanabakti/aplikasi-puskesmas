import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Edit({ auth }) {
    const { data, setData, post, processing, errors, reset, get, patch } =
        useForm({
            name: auth.user.name,
            email: auth.user.email,
            no_telepon: auth.user.no_telepon,
            alamat: auth.user.alamat,
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
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                    <span className="text-muted fw-light">
                        Account Settings /
                    </span>{" "}
                    Account
                </h4>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <h5 className="card-header">Profile Details</h5>

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

                                    <div className="button-wrapper">
                                        <label
                                            htmlFor="upload"
                                            className="btn btn-primary me-2 mb-4"
                                            tabIndex="0"
                                        >
                                            <span className="d-none d-sm-block">
                                                Upload new photo
                                            </span>
                                            <i className="bx bx-upload d-block d-sm-none"></i>
                                            <input
                                                type="file"
                                                id="upload"
                                                className="account-file-input"
                                                hidden
                                                accept="image/png, image/jpeg"
                                                onChange={(e) => imageChange(e)}
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSelectedImage()
                                            }
                                            className="btn btn-outline-secondary account-image-reset mb-4"
                                        >
                                            <i className="bx bx-reset d-block d-sm-none"></i>
                                            <span className="d-none d-sm-block">
                                                Reset
                                            </span>
                                        </button>

                                        <p className="text-muted mb-0">
                                            Allowed JPG, GIF or PNG. Max size of
                                            800K
                                        </p>
                                    </div>
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
                                                value={auth.user.uuid}
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
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            className="btn btn-primary me-2"
                                        >
                                            Save changes
                                        </button>
                                        <Link
                                            href={"/dashboard"}
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
