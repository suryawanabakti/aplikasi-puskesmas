import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset, get } = useForm({
        nama: "",

        noTelepon: "",
        alamat: "",
    });

    const handleSave = (e) => {
        e.preventDefault();

        post(route("admin.master-data.posyandu.store"), {
            onSuccess: () => {
                toast.success("Berhasil tambah posyandu");
                reset();
            },
            onError: (err) => {
                console.log(err);
                toast.error("Gagal tambah posyandu");
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
                                    href={route("admin.master-data.posyandu")}
                                    className="text-light"
                                >
                                    posyandu
                                </Link>{" "}
                                /{" "}
                            </span>
                            Create
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.master-data.posyandu")}
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
                                Create A New Posyandu
                            </h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form method="POST" onSubmit={handleSave}>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Nama Tempat
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
                                                "admin.master-data.pasien"
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
