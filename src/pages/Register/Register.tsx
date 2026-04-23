import AuthInput from "@/components/common/AuthInput";
import AuthButton from "@/components/common/AuthButton";
import SocialAuthButtons from "@/components/common/SocialAuthButtons";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F9FAF4] px-6">

            <div className="w-full max-w-[400px] flex flex-col items-center gap-8">

                {/* Title */}
                <div className="text-center space-y-3">
                    <h1 className="text-[36px] leading-[40px] font-extrabold text-[#1A1C19]">
                        Tham gia với chúng tôi
                    </h1>
                    <p className="text-[14px] leading-[22px] text-[#444840] max-w-[320px] mx-auto">
                        Tạo tài khoản của bạn để bắt đầu xây dựng tủ quần áo của mình
                    </p>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col gap-5">

                    <AuthInput label="Full Name" placeholder="Tên tài khoản" />
                    <AuthInput label="Email" placeholder="Nhập email" type="email" />

                    <div className="grid grid-cols-2 gap-3">
                        <AuthInput label="Password" type="password" placeholder="" />
                        <AuthInput label="Confirm Password" type="password" placeholder="" />
                    </div>

                    <AuthButton text="Đăng ký" />

                    {/* Divider */}
                    <div className="relative flex items-center my-2">
                        <div className="flex-grow border-t border-[rgba(196,200,189,0.3)]"></div>
                        <span className="mx-3 text-[11px] tracking-widest font-semibold text-[#74796F]">
                            OR SIGN UP WITH
                        </span>
                        <div className="flex-grow border-t border-[rgba(196,200,189,0.3)]"></div>
                    </div>

                    <SocialAuthButtons />

                    <div className="text-center text-[14px]">
                        <span className="text-[#444840]">Already have an account? </span>
                        <Link to="/login" className="font-semibold text-[#49613E] underline">
                            Login
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Register;