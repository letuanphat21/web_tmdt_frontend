type Props = {
    title: string;
    price: string;
    seller: string;
    image: string;
    tag?: string;
};

const ProductCard = ({ title, price, seller, image, tag }: Props) => {
    return (
        <div className="space-y-2">

            <div className="relative rounded-xl overflow-hidden">
                {tag && (
                    <span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
                )}

                <img src={image} className="w-full h-[220px] object-cover" />
            </div>

            <h3 className="text-sm font-medium">{title}</h3>

            <p className="font-semibold">{price}</p>

            <p className="text-xs text-gray-500">by {seller}</p>
        </div>
    );
};

export default ProductCard;