import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/auth/register", data);
            console.log(res);
            message.success("Account created successfully!");
            reset();
        } catch (error) {
            console.log(error)
            message.error(error.response.data?.message || error.message || "Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-3">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                <p className="text-gray-500 text-sm mb-6">Sign up to book appointments</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{ required: "Full name is required" }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="John Doe"
                                    size="large"
                                    className={`${errors.fullName ? "border-red-500" : ""}`}
                                />
                            )}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>

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
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="********"
                                    size="large"
                                    className={`${errors.password ? "border-red-500" : ""}`}
                                />
                            )}
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <Button
                        htmlType="submit"
                        type="primary"
                        loading={isSubmitting}
                        size="large"
                        className="w-full bg-[#567DFD]! hover:bg-[#4769e6]! rounded-lg font-medium shadow-sm"
                    >
                        Create Account
                    </Button>
                </form>

                <p className="text-center mt-5 text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-[#567DFD] font-medium hover:underline">
                        &nbsp; Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;