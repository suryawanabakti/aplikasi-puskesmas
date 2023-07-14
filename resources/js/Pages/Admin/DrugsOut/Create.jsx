import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { toast } from "react-hot-toast";
import { Alert } from "react-bootstrap";
import axios from "axios";

export default function Create({ auth, drugs, pasien }) {
    const { flash } = usePage().props;

    const [totalStok, setTotalStok] = useState(0);
    const [stok, setStok] = useState(0);

    const { data, setData, post, processing, errors, reset, get } = useForm({
        pasien: "",
        obat: "",
        tanggalKeluar: "",
        jumlahKeluar: "",
        totalStok: totalStok,
    });

    const handleChangeJumlahKeluar = (e) => {
        setData("jumlahKeluar", e.target.value);
        let totalStok = parseInt(stok) - parseInt(e.target.value);
        setTotalStok(totalStok);
    };

    const handleOnChangeDrug = (drug) => {
        setData("obat", drug.value);
        setStok(drug.stok);
    };

    const loadOptions = async (searchValue, callback) => {
        const res = await axios.get(
            "/admin/transaction/drugs-out/pasien/" + searchValue
        );
        console.log(res.data.data);
        callback(res.data.data);
        // setTimeout(() => {
        //     const filteredOptions = res.data.filter((option) => option);
        // }, 2000);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.transaction.drugs-out.store"), {
            onSuccess: (res) => {},
            onError: (err) => {
                console.log(err);
                toast.error("Gagal tambah obat keluar");
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
            <Head title="Buat Obat Keluar" />
            <div className="container-xxl flex-grow-1 container-p-y ">
                {flash.type == "error" && (
                    <Alert key={"danger"} variant={"danger"} dismissible>
                        {flash.message}
                    </Alert>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="fw-bold py-2 mb-2">
                            <span className="text-muted fw-light">
                                Transaksi /{" "}
                                <Link
                                    href={route("admin.transaction.drugs-in")}
                                    className="text-light"
                                >
                                    Obat Keluar
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
                                Create A New Drug Out
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
                                                Tanggal Keluar
                                            </label>
                                            <input
                                                type="date"
                                                value={data.tanggalKeluar}
                                                onChange={(e) =>
                                                    setData(
                                                        "tanggalKeluar",
                                                        e.target.value
                                                    )
                                                }
                                                className="form-control"
                                            />
                                            <span className="text-danger">
                                                {errors.tanggalKeluar}
                                            </span>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Pasien
                                            </label>
                                            <AsyncSelect
                                                isClearable={true}
                                                loadOptions={loadOptions}
                                                onChange={({ value }) =>
                                                    setData("pasien", value)
                                                }
                                            />
                                            {/* <Select
                                                options={pasien.data}
                                                onChange={(pas) =>
                                                    setData("pasien", pas.value)
                                                }
                                            /> */}

                                            <span className="text-danger">
                                                {errors.pasien}
                                            </span>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Jumlah Keluar
                                            </label>
                                            <input
                                                name="jumlahKeluar"
                                                id="jumlahKeluar"
                                                value={data.jumlahKeluar}
                                                onChange={
                                                    handleChangeJumlahKeluar
                                                }
                                                type="number"
                                                className="form-control"
                                            />
                                            <span className="text-danger">
                                                {errors.jumlahKeluar}
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
