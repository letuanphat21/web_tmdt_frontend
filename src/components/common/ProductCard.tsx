import { Link } from "react-router-dom";

type Props = {
    id: number;
    title: string;
    price: string;
    seller: string;
    image: string;
    tag?: string;
};

const ProductCard = ({ id, title, price, seller, image, tag }: Props) => {
    return (
        <Link to={`/product/${id}`} className="space-y-2 block cursor-pointer group">
            <div className="relative rounded-xl overflow-hidden">
                {tag && (
                    <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full z-10">
                        {tag}
                    </span>
                )}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <h3 className="text-sm font-medium group-hover:text-[#49613E] transition-colors">{title}</h3>
            <p className="font-semibold">{price}</p>
            <p className="text-xs text-gray-500">by {seller}</p>
        </Link>
    );
};

export default ProductCard;