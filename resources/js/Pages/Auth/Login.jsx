import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                reset();
            },
            onError: (err) => {
                toast.error(err.email);
                setData("password", "");
            },
        });
    };

    return (
        <GuestLayout>
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center">
                                <a href="#" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img
                                            src="/logo.jpeg"
                                            width={40}
                                            alt=""
                                        />
                                    </span>
                                    <span className="app-brand-text demo text-body fw-bolder">
                                        puskesmas lumpue
                                    </span>
                                </a>
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2">Selamat datang! 👋</h4>
                            <p className="mb-4"></p>

                            <form
                                id="formAuthentication"
                                className="mb-3"
                                onSubmit={submit}
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email or Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email-username"
                                        placeholder="Enter your email or username"
                                        autoFocus
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between">
                                        <label
                                            className="form-label"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="············"
                                            aria-describedby="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span
                                            className="input-group-text cursor-pointer"
                                            onClick={() => handleShowPassword()}
                                        >
                                            {showPassword ? (
                                                <i className="bx bx-show" />
                                            ) : (
                                                <i className="bx bx-hide" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="remember-me"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="remember-me"
                                        >
                                            {" "}
                                            Remember Me{" "}
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button
                                        disabled={processing}
                                        className="btn btn-primary  w-100"
                                        type="submit"
                                    >
                                        {processing ? (
                                            <>
                                                <span
                                                    class="spinner-grow spinner-grow-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Loading ...{" "}
                                            </>
                                        ) : (
                                            <>Login</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
