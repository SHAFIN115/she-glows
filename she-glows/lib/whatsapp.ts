export function buildWhatsAppURL(
  productName: string,
  price: number,
  qty: number,
  category: string
): string {
  const total = price * qty;
  const message = `Hello SheGlows! 👋

I'd like to order:

🛍 *${productName}*
Category: ${category}
Qty: ${qty}
Price: ৳${price.toLocaleString()} × ${qty} = *৳${total.toLocaleString()}*

Please confirm availability and delivery details. Thank you!`;

  const phone = "8801577677921";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}