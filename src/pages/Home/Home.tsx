import Hero from "./sections/Hero";
import Categories from "./sections/Categories";
import ProductSection from "./sections/ProductSection";
import SellerSection from "./sections/SellerSection";

const Home = () => {
    return (
        <div className="flex flex-col gap-5">

            <Hero/>

            <Categories/>

            <ProductSection title="Sản phẩm mới đăng"/>
            <ProductSection title="Sản phẩm bán chạy nhất"/>

            <SellerSection/>

        </div>
    );
};

export default Home;