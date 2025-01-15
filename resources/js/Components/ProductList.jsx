import React from "react";
import { useEffect, useState } from "react";
const ProductList = ({ products }) => {
    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(() => {
        const filteredProducts = products.filter(
            (product) => product.catalog_visibility === "visible"
        );

        setVisibleProducts(filteredProducts.slice(0, 4));
    }, [products]);

    function formatRupiah(amount) {
        if (typeof amount !== "number") {
            amount = parseFloat(amount);
        }

        if (isNaN(amount)) {
            return "Invalid number";
        }

        return "Rp " + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
                <a
                    href={product.permalink}
                    key={product.id}
                    target="_blank"
                    className="group rounded-lg flex flex-col relative block overflow-hidden border border-gray-100 bg-white"
                >
                    <img
                        src={product.images[0]?.src || "default-image.jpg"} // Gambar produk
                        alt={product.name}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />

                    <div className="relative flex-1 flex flex-col bg-white p-6">
                        <span className="self-start bg-green-50 px-3 py-1.5 text-xs font-medium rounded-lg">
                            {product.categories[0].name}{" "}
                        </span>

                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            {product.name}
                        </h3>

                        <p className="mt-1.5 text-sm text-gray-700 mb-4">
                            {product.regular_price
                                ? formatRupiah(product.regular_price)
                                : ""}
                        </p>
                        <div className="mt-auto">
                            <button className="block w-full text-white rounded bg-green-500 p-2 text-sm font-medium transition hover:scale-105">
                                Beli Sekarang
                            </button>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ProductList;
