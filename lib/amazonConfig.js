// Amazon Configuration
export const amazonConfig = {
    // Replace these URLs with your actual Amazon product links
    productUrl: "https://www.amazon.in/dp/B0DXV5TZ1P", // Main Amazon product page
    affiliateUrl: "https://amzn.to/YOUR_AFFILIATE_LINK", // Amazon affiliate link (if you have one)
    
    // Product details for Amazon
    productASIN: "B0DXV5TZ1P", // Amazon ASIN
    productTitle: "Sampoorna Digestive Health Supplement",
    
    // Alternative marketplaces (if available)
    amazonUS: "https://www.amazon.com/dp/B0DXV5TZ1P",
    amazonUK: "https://www.amazon.co.uk/dp/B0DXV5TZ1P",
    
    // Use affiliate link if available, otherwise use direct product URL
    getBuyUrl: function() {
        return this.affiliateUrl !== "https://amzn.to/YOUR_AFFILIATE_LINK" 
            ? this.affiliateUrl 
            : this.productUrl;
    }
};

// Instructions for setup:
// 1. Replace B0DXV5TZ1P with your actual Amazon product ASIN
// 2. Replace YOUR_AFFILIATE_LINK with your Amazon affiliate link (if you have one)
// 3. Update the productTitle to match your actual product name
// 4. Add additional marketplace URLs if your product is available in other regions
