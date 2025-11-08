import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", data, {
                withCredentials: true
            });

            message.success("Login successful!");

            if (res.data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (res.data.user.role === "doctor") {
                navigate("/doctor/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.log(error)
            message.error(error.response?.data?.message || "Invalid email or password!");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-3">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
                {/* ---------- Header ---------- */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
                {/* <p className="text-gray-500 text-sm mb-6">
                    Please log in to book appointment
                </p> */}

                {/* ---------- Form ---------- */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="example@gmail.com"
                                    size="large"
                                    className={`${errors.email ? "border-red-500" : ""}`}
                                />
                            )}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="********"
                                    size="large"
                                    className={`${errors.password ? "border-red-500" : ""}`}
                                />
                            )}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* ---------- Submit Button ---------- */}
                    <Button
                        htmlType="submit"
                        type="primary"
                        loading={isSubmitting}
                        size="large"
                        className="w-full bg-[#567DFD]! hover:bg-[#4769e6]! rounded-lg font-medium shadow-sm"
                    >
                        Login
                    </Button>
                </form>

                {/* ---------- Footer Text ---------- */}
                <p className="text-center mt-5 text-sm text-gray-600">
                    Create a new account?
                    <Link
                        to="/signup"
                        className="text-[#567DFD] font-medium hover:underline"
                    >
                        &nbsp;Click here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;