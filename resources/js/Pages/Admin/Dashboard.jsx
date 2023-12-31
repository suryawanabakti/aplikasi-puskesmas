import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { useState } from "react";
import Chart from "react-apexcharts";

export default function Dashboard({
    auth,
    totalPasien,
    totalPosyandu,
    transaksi,
    totalObat,
}) {
    console.log(transaksi);
    const [labels, setLabels] = useState(["Obat Masuk", "Obat Keluar"]);
    const [series, setSeries] = useState([
        transaksi.totalObatMasuk,
        transaksi.totalObatKeluar,
    ]);
    const [options, setOptions] = useState({
        chart: {
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                export: {
                    csv: {
                        filename: undefined,
                        columnDelimiter: ",",
                        headerCategory: "Transaksi",
                        headerValue: "Value",
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString();
                        },
                    },
                    svg: {
                        filename: undefined,
                    },
                    png: {
                        filename: undefined,
                    },
                },
                autoSelected: "zoom",
            },
        },
        colors: ["#00FF7F", "#FF5733"],
        labels: labels,
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-0">
                                        <h5>Total Pasien</h5>
                                    </div>
                                </div>
                                <div>{totalPasien}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-0">
                                        <h5>Total Posyandu</h5>
                                    </div>
                                </div>
                                <div>{totalPosyandu}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-0">
                                        <h5>Total Obat </h5>
                                    </div>
                                </div>
                                <div>{totalObat}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-0">
                                        <h5>Grafik Obat Masuk & Obat Keluar</h5>
                                    </div>
                                </div>
                                <div>
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="pie"
                                        labels={labels}
                                        width={400}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
