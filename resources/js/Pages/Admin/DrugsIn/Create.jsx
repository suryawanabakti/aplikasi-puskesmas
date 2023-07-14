import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import { toast } from "react-hot-toast";

export default function Create({ auth, drugs, suppliers }) {
    const [hargaBeli, setHargaBeli] = useState();

    const [totalStok, setTotalStok] = useState(0);
    const [stok, setStok] = useState(0);

    const { data, setData, post, processing, errors, reset, get } = useForm({
        supplier: "",
        obat: "",
        tanggalMasuk: "",
        tanggalKadaluarsa: "",
        jumlahMasuk: "",
        totalStok: totalStok,
    });

    const handleChangeJumlahMasuk = (e) => {
        setData("jumlahMasuk", e.target.value);
        let totalStok = parseInt(e.target.value) + parseInt(stok);
        setTotalStok(totalStok);
    };

    const handleOnChangeDrug = (drug) => {
        setData("obat", drug.value);
        setStok(drug.stok);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.transaction.drugs-in.store"), {
            onSuccess: (res) => {
                console.log(res);
                toast.success("Berhasil tambah obat masuk");
                reset();
            },
            onError: (err) => {
                console.log(err);
                toast.error("Gagal tambah obat");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="Drug In Create" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Transaksi /{" "}
                                <Link
                                    href={route("admin.transaction.drugs-in")}
                                    className="text-light"
                                >
                                    Obat Masuk
                                </Link>{" "}
                                /{" "}
                            </span>
                            Create
                        </h4>
                    </div>
                    <div className="col-md-6">
                        <Link
                            href={route("admin.transaction.drugs-in")}
                            className="py-2 mb-2 float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h5 className="card-header">
                                Create A New Drug In
                            </h5>
                            <hr className="my-0" />
                            <div className="card-body">
                                <form onSubmit={submit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Obat
                                            </label>
                                            <Select
                                                isClearable={false}
                                                options={drugs.data}
                                                onChange={(drug) =>
                                                    handleOnChangeDrug(drug)
                                                }
                                            />
                                            <span className="text-danger">
                                                {errors.obat}
                                            </span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Stok
                                            </label>
                                            <input
                                                value={stok}
                                                type="text"
                                                readOnly
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Tanggal Masuk
                                            </label>
                                            <input
                                                type="date"
                                                value={data.tanggalMasuk}
                                                onChange={(e) =>
                                                    setData(
                                                        "tanggalMasuk",
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                            />
                                            <span className="text-danger">
                                                {errors.tanggalMasuk}
                                            </span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Tanggal Kadaluarsa
                                            </label>
                                            <input
                                                type="date"
                                                value={data.tanggalKadaluarsa}
                                                onChange={(e) =>
                                                    setData(
                                                        "tanggalKadaluarsa",
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                            />
                                            <span className="text-danger">
                                                {errors.tanggalKadaluarsa}
                                            </span>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Supplier
                                            </label>
                                            <Select
                                                options={suppliers.data}
                                                onChange={(supplier) =>
                                                    setData(
                                                        "supplier",
                                                        supplier.value
                                                    )
                                                }
                                            />
                                            <span className="text-danger">
                                                {errors.supplier}
                                            </span>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Jumlah Masuk
                                            </label>
                                            <input
                                                name="jumlahMasuk"
                                                id="jumlahMasuk"
                                                value={data.jumlahMasuk}
                                                onChange={
                                                    handleChangeJumlahMasuk
                                                }
                                                type="number"
                                                className="form-control"
                                            />
                                            <span className="text-danger">
                                                {errors.jumlahMasuk}
                                            </span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Total Stok
                                            </label>
                                            <input
                                                value={totalStok}
                                                readOnly
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
