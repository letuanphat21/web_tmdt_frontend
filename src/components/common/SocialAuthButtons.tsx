import React from 'react';

const SocialAuthButtons: React.FC = () => {
    return (
        <div className="flex gap-3">
            {/* Google */}
            <button
                className="
                flex-1 h-[44px]
                flex items-center justify-center gap-2
                border border-[#E5E7EB]
                rounded-full
                bg-white
                text-[14px] font-medium
                text-[#1A1C19]
                hover:bg-gray-50 transition
            ">
                <i className="fa-brands fa-google text-[16px]"></i>
                Google
            </button>

            {/* Facebook */}
            <button
                className="
                flex-1 h-[44px]
                flex items-center justify-center gap-2
                border border-[#E5E7EB]
                rounded-full
                bg-white
                text-[14px] font-medium
                text-[#1A1C19]
                hover:bg-gray-50 transition
            ">
                <i className="fa-brands fa-facebook text-[16px] text-[#1877F2]"></i>
                Facebook
            </button>
        </div>
    );
};

export default SocialAuthButtons;