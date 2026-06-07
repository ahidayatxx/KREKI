#!/usr/bin/env python3
"""
Final BPOM Scraper - Menggunakan form search yang sebenarnya
"""

from playwright.sync_api import sync_playwright
import json
import csv
from datetime import datetime
import time


class BPOMFinalScraper:
    def __init__(self, headless=True):
        self.base_url = "https://cekbpom.pom.go.id/"
        self.headless = headless

    def scrape_products(self, keyword, max_results=100):
        """
        Scrape BPOM products

        Args:
            keyword (str): Search keyword
            max_results (int): Maximum results to scrape

        Returns:
            list: List of product dictionaries
        """
        products = []

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=self.headless)
            page = browser.new_page()

            try:
                # Navigate directly to search results page
                search_url = f"{self.base_url}all-produk?query={keyword}"
                print(f"\n🌐 Opening search results...")
                print(f"🔍 URL: {search_url}")

                page.goto(search_url, wait_until='domcontentloaded', timeout=30000)

                print(f"✓ Loaded: {page.title()}")

                # Wait for table to appear (it may be loaded via AJAX)
                print("\n⏳ Waiting for table to load...")

                # First, wait for DataTable to appear
                try:
                    page.wait_for_selector('table.dataTable', timeout=15000)
                    print("✓ DataTable initialized")
                except:
                    print("⚠️  DataTable not found")

                # Wait for loading overlay to disappear
                print("⏳ Waiting for data to load...")
                try:
                    # Wait for "Loading..." to disappear
                    page.wait_for_function(
                        "!document.body.innerText.includes('Loading')",
                        timeout=20000
                    )
                    print("✓ Loading completed")
                except:
                    print("⚠️  Loading indicator still present, continuing anyway...")

                # Wait for actual table rows to appear
                try:
                    page.wait_for_selector('table tbody tr td', timeout=10000)
                    print("✓ Table data appeared")
                    time.sleep(2)  # Extra buffer for any animations
                except:
                    print("⚠️  Table rows not detected, will try anyway...")
                    time.sleep(3)

                # Look for results table
                # Try multiple table selectors
                table_selectors = [
                    'table tbody tr',
                    'table',
                    'table.dataTable',
                    'table#example',
                    '.table'
                ]

                rows = []
                for selector in table_selectors:
                    try:
                        if selector.endswith('tr'):
                            rows = page.locator(selector).all()
                        else:
                            table = page.locator(selector).first
                            if table.is_visible():
                                rows = table.locator('tbody tr').all()

                        if rows:
                            print(f"✓ Found table with selector: {selector}")
                            print(f"✓ Found {len(rows)} rows")
                            break
                    except:
                        continue

                if rows:
                    print(f"\n📋 Extracting product data...")

                    for i, row in enumerate(rows):
                        if i >= max_results:
                            break

                        try:
                            cells = row.locator('td').all()

                            if cells:
                                # Extract cell data
                                cell_data = []
                                for cell in cells:
                                    text = cell.inner_text().strip()
                                    cell_data.append(text)

                                # Create product dictionary
                                # Typically: [Tipe, Nomor Registrasi, Nama Produk, Pendaftar, ...]
                                product = {
                                    "raw_data": cell_data,
                                    "search_keyword": keyword,
                                    "timestamp": datetime.now().isoformat()
                                }

                                # Try to map to meaningful fields
                                if len(cell_data) >= 4:
                                    product["type"] = cell_data[0] if len(cell_data) > 0 else ""
                                    product["registration_number"] = cell_data[1] if len(cell_data) > 1 else ""
                                    product["product_name"] = cell_data[2] if len(cell_data) > 2 else ""
                                    product["registrant"] = cell_data[3] if len(cell_data) > 3 else ""

                                products.append(product)

                                # Print progress
                                if "product_name" in product:
                                    print(f"  {i+1}. {product['product_name']}")
                                else:
                                    print(f"  {i+1}. {' | '.join(cell_data[:3])}")

                        except Exception as e:
                            print(f"  ⚠️  Error extracting row {i+1}: {e}")
                            continue

                else:
                    print("\n⚠️  No table found, checking page content...")

                    # Take screenshot
                    screenshot = f"results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
                    page.screenshot(path=screenshot, full_page=True)
                    print(f"📸 Screenshot: {screenshot}")

                    # Check if there are results
                    page_text = page.content()
                    if "tidak ditemukan" in page_text.lower() or "no data" in page_text.lower():
                        print("❌ No results found for this keyword")
                    else:
                        print("⚠️  Page structure different than expected")

                # Keep browser open if not headless
                if not self.headless:
                    print("\n⏳ Browser stays open for 10 seconds...")
                    time.sleep(10)

            except Exception as e:
                print(f"\n❌ Error: {e}")
                import traceback
                traceback.print_exc()

                # Screenshot on error
                try:
                    page.screenshot(path=f"error_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png")
                except:
                    pass

            finally:
                browser.close()

        return products

    def save_json(self, data, filename=None):
        """Save to JSON"""
        if not filename:
            filename = f"bpom_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"\n💾 JSON saved: {filename}")
        return filename

    def save_csv(self, data, filename=None):
        """Save to CSV"""
        if not data:
            return None

        if not filename:
            filename = f"bpom_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

        # Get all unique keys
        all_keys = set()
        for item in data:
            all_keys.update(item.keys())

        # Remove raw_data for CSV (too complex)
        all_keys.discard('raw_data')
        fieldnames = sorted(all_keys)

        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(data)

        print(f"💾 CSV saved: {filename}")
        return filename


def main():
    print("=" * 60)
    print("🔬 BPOM CekBPOM Scraper - Final Version")
    print("=" * 60)

    keyword = input("\nKeyword (default=paracetamol): ").strip() or "paracetamol"
    max_results = input("Max results (default=50): ").strip()
    max_results = int(max_results) if max_results.isdigit() else 50

    headless_input = input("Headless mode? (y/n, default=n): ").strip().lower()
    headless = headless_input == 'y'

    # Run scraper
    scraper = BPOMFinalScraper(headless=headless)
    products = scraper.scrape_products(keyword, max_results)

    # Save results
    if products:
        print(f"\n✅ SUCCESS! Scraped {len(products)} products")

        scraper.save_json(products)
        scraper.save_csv(products)

        print("\n📊 Sample (first 3 products):")
        for i, product in enumerate(products[:3], 1):
            if "product_name" in product:
                print(f"\n  {i}. {product['product_name']}")
                print(f"     Reg: {product.get('registration_number', 'N/A')}")
                print(f"     Type: {product.get('type', 'N/A')}")
            else:
                print(f"\n  {i}. {product.get('raw_data', ['N/A'])[0] if product.get('raw_data') else 'N/A'}")

    else:
        print("\n❌ No products found")
        print("\n💡 Suggestions:")
        print("  - Try different keyword")
        print("  - Run without headless to see what's happening")
        print("  - Check screenshots for errors")

if __name__ == "__main__":
    main()
