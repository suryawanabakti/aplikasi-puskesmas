import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ErrorLayout from "@/Layouts/ErrorLayout";

import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function HasNotData({ auth, header, message, urlRoute }) {
    return (
        <ErrorLayout>
            <Head title="Error " />
            <div className="container-xxl container-p-y">
                <div className="misc-wrapper text-center">
                    <h2 className="mb-2 mx-2">Kekurangan Data!</h2>
                    <p className="mb-4 mx-2">{message}</p>
                    <Link href={route(urlRoute)} className="btn btn-primary">
                        Buat Data !
                    </Link>
                    <div className="mt-4 ">
                        <img
                            src="../assets/img/illustrations/girl-doing-yoga-light.png"
                            alt="girl-doing-yoga-light"
                            width={500}
                            className="img-fluid mx-auto"
                            data-app-dark-img="illustrations/girl-doing-yoga-dark.png"
                            data-app-light-img="illustrations/girl-doing-yoga-light.png"
                        />
                    </div>
                </div>
            </div>
        </ErrorLayout>
    );
}
