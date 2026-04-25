import heroImg from "@/assets/hero.png";

const Hero = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-16">

            <div className="flex items-center justify-between gap-12">

                {/* LEFT CONTENT */}
                <div className="flex-1">
                    <h1 className="text-[48px] leading-[56px] font-extrabold text-[#1A1C19]">
                        CHÀO MỪNG TỚI <br />
                        CHỢ ĐỒ CŨ
                    </h1>

                    <p className="mt-4 text-[16px] text-[#444840] max-w-[420px]">
                        Hãy trải nghiệm chợ đồ cũ tốt nhất ở Việt Nam của chúng tôi đi nào mọi người
                    </p>

                    <button className="mt-6 px-6 h-[44px] bg-[#49613E] text-white rounded-full font-medium">
                        Mua sắm ngay →
                    </button>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex-1 flex justify-end">
                    <div className="w-[420px] h-[500px] rounded-[24px] overflow-hidden">
                        <img
                            src={heroImg}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Hero;