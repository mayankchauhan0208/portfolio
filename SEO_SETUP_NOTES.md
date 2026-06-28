# Google Search Setup Notes

The site already publishes crawlable metadata, `robots.txt`, and an XML sitemap. Complete these external steps after deployment:

1. Add `https://mayankchauhan.co.in` to Google Search Console.
2. Verify domain ownership using the DNS record supplied by Google. Do not commit the verification value unless using Google's HTML-tag verification method intentionally.
3. Submit `https://mayankchauhan.co.in/sitemap.xml` in Search Console.
4. Use URL Inspection to request indexing for:
   - `https://mayankchauhan.co.in`
   - `https://mayankchauhan.co.in/work`
5. Keep LinkedIn and Behance profile links pointing back to the portfolio where appropriate.
6. Use the same public name spelling everywhere: **Mayank Chauhan**.

Google treats sitemap submission and indexing requests as discovery signals, not guarantees of ranking or immediate indexing. Keep portfolio content accurate and update the sitemap through the existing Next.js build whenever categories change.
