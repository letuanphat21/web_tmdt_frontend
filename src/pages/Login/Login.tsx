import React from 'react';
import {Link} from 'react-router-dom';
import AuthInput from '@/components/common/AuthInput';
import AuthButton from '@/components/common/AuthButton';
import SocialAuthButtons from '@/components/common/SocialAuthButtons';

const Login: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F9FAF4] px-6">

            <div className="w-full max-w-[400px] flex flex-col items-center gap-8">

                {/* Title */}
                <div className="text-center space-y-3">
                    <h1 className="text-[36px] leading-[40px] font-extrabold text-[#1A1C19]">
                        Chào mừng bạn trở lại
                    </h1>
                    <p className="text-[14px] text-[#444840]">
                        Đăng nhập để tiếp tục trải nghiệm của bạn
                    </p>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col gap-5">

                    <AuthInput
                        label="Email"
                        placeholder="curator@example.com"
                        type="email"
                    />

                    {/* Password + Forgot */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[14px] font-semibold text-[#444840]">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-[13px] text-[#74796F] hover:text-[#1A1C19]"
                            >
                                Forgot?
                            </Link>
                        </div>

                        <input
                            type="password"
                            placeholder="• • • • • • • •"
                            className="
                                w-full h-[48px]
                                px-4
                                rounded-[10px]
                                bg-[#F3F4EE]
                                text-[14px]
                                placeholder:text-[#C4C8BD]
                                focus:outline-none focus:ring-1 focus:ring-[#49613E]
                            "
                        />
                    </div>

                    <AuthButton text="Đăng nhập"/>

                    {/* Divider */}
                    <div className="relative flex items-center my-2">
                        <div className="flex-grow border-t border-[rgba(196,200,189,0.3)]"></div>
                        <span className="mx-3 text-[11px] tracking-widest font-semibold text-[#74796F]">
                            OR SIGN IN WITH
                        </span>
                        <div className="flex-grow border-t border-[rgba(196,200,189,0.3)]"></div>
                    </div>

                    <SocialAuthButtons/>

                    {/* Register link */}
                    <div className="text-center text-[14px]">
                        <span className="text-[#444840]">
                            Don’t have an account?{" "}
                        </span>
                        <Link
                            to="/register"
                            className="font-semibold text-[#49613E] underline"
                        >
                            Sign up
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;