// Shorten text to n characters and add "..." at the end
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

// Validate email address format
export const validateEmail = (email) => {
  return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
};

// Get product ids and cart quantity from cart items
export const getProductIdsAndCartQuantity = (products) => {
  return products.map((product) => {
    return { _id: product._id, cartQuantity: product.cartQuantity };
  });
};
