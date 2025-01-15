import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
    url: import.meta.env.VITE_WOOCOMMERCE_URL,
    consumerKey: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET,
    version: "wc/v3",
});

export default WooCommerce;
