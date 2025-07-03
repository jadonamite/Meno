export function formatPrice(ethPrice, showFiat = false) {
   if (showFiat) {
      const fiatPrice = ethPrice * 3000; // Mock conversion rate
      return `$${fiatPrice.toLocaleString()}`;
   }
   return `${ethPrice} ETH`;
}
