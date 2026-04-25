import React from 'react';

interface AuthInputProps {
    label: string;
    placeholder: string;
    type?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({label, placeholder, type = 'text'}) => {
    return (
        <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[14px] font-semibold text-[#444840] leading-[20px]">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
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
    );
};

export default AuthInput;