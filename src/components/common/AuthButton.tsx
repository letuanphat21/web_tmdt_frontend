import React from 'react';

interface AuthButtonProps {
    text: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({text}) => {
    return (
        <button
            type="submit"
            className="
    w-full h-[52px]
    rounded-full
    text-white
    text-[16px]
    font-semibold
    shadow-sm
    hover:opacity-90
    transition
  "
            style={{
                background: 'linear-gradient(135deg, #49613E 0%, #617A55 100%)'
            }}
        >
            {text}
        </button>
    );
};

export default AuthButton;