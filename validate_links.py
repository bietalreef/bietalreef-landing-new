import json
import re
import os
import glob

# Helper function to convert JavaScript object string to a valid JSON string
def js_to_json_string(js_string):
    # Remove comments first to avoid issues with quotes inside comments
    json_string = re.sub(r"//.*", "", js_string)
    json_string = re.sub(r"/\*.*?\*/", "", json_string, flags=re.DOTALL)

    # Replace single quotes with double quotes for string values
    # This is a more robust way to handle single quotes that are part of string values
    json_string = re.sub(r"\'(.*?)\'", r"\"\1\"", json_string)

    # Ensure all object keys are double-quoted
    # This regex looks for a word character followed by a colon, not preceded by a double quote
    json_string = re.sub(r'([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', json_string)

    # Remove trailing commas (invalid in JSON)
    json_string = re.sub(r',\s*([}\]])', r'\1', json_string)
    
    return json_string

# Load siteTaxonomy.js content
with open("/home/ubuntu/bietalreef-landing-new/data/siteTaxonomy.js", "r", encoding="utf-8") as f:
    site_taxonomy_content = f.read()

# Extract UAE_EMIRATES and SERVICE_CATEGORIES using regex
uae_emirates_match = re.search(r"export const UAE_EMIRATES = (.*?);", site_taxonomy_content, re.DOTALL)
service_categories_match = re.search(r"export const SERVICE_CATEGORIES = (.*?);", site_taxonomy_content, re.DOTALL)

UAE_EMIRATES = []
SERVICE_CATEGORIES = []

if uae_emirates_match:
    try:
        json_str = uae_emirates_match.group(1).strip()
        json_str = js_to_json_string(json_str)
        UAE_EMIRATES = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding UAE_EMIRATES: {e}")

if service_categories_match:
    try:
        json_str = service_categories_match.group(1).strip()
        json_str = js_to_json_string(json_str)
        SERVICE_CATEGORIES = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding SERVICE_CATEGORIES: {e}")

# Load englishPages.js content
with open("/home/ubuntu/bietalreef-landing-new/data/englishPages.js", "r", encoding="utf-8") as f:
    english_pages_content = f.read()

english_static_pages_match = re.search(r"export const ENGLISH_STATIC_PAGES = (.*?);", english_pages_content, re.DOTALL)
english_seo_service_pages_match = re.search(r"export const ENGLISH_SEO_SERVICE_PAGES = (.*?);", english_pages_content, re.DOTALL)

ENGLISH_STATIC_PAGES = {}
ENGLISH_SEO_SERVICE_PAGES = {}

if english_static_pages_match:
    try:
        json_str = english_static_pages_match.group(1).strip()
        json_str = js_to_json_string(json_str)
        ENGLISH_STATIC_PAGES = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding ENGLISH_STATIC_PAGES: {e}")

if english_seo_service_pages_match:
    try:
        json_str = english_seo_service_pages_match.group(1).strip()
        json_str = js_to_json_string(json_str)
        ENGLISH_SEO_SERVICE_PAGES = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding ENGLISH_SEO_SERVICE_PAGES: {e}")


VALID_PATHS = set()

# Add static pages
static_pages = [
    "/", "/blog", "/legal", "/platform", "/services", "/uae", "/weyaak",
    "/en", "/en-sitemap", "/en/categories", "/en/uae",
    "/contractors-in-uae", "/interior-design-uae", "/marketplace", "/tools", "/press", "/about",
    "/providers" # Explicitly add /providers
]
for page in static_pages:
    VALID_PATHS.add(page)
    VALID_PATHS.add(f"https://bietalreef.ae{page}")

# Add English static pages from ENGLISH_STATIC_PAGES (checking for actual file existence)
for slug in ENGLISH_STATIC_PAGES.keys():
    if os.path.exists(f"/home/ubuntu/bietalreef-landing-new/pages/en/{slug}.js"):
        VALID_PATHS.add(f"/en/{slug}")
        VALID_PATHS.add(f"https://bietalreef.ae/en/{slug}")

# Add English SEO service pages from ENGLISH_SEO_SERVICE_PAGES (checking for actual file existence)
for slug in ENGLISH_SEO_SERVICE_PAGES.keys():
    if os.path.exists(f"/home/ubuntu/bietalreef-landing-new/pages/en/{slug}.js"):
        VALID_PATHS.add(f"/en/{slug}")
        VALID_PATHS.add(f"https://bietalreef.ae/en/{slug}")

# Add dynamic paths from siteTaxonomy
for emirate in UAE_EMIRATES:
    VALID_PATHS.add(f"/uae/{emirate["slug"]}")
    VALID_PATHS.add(f"https://bietalreef.ae/uae/{emirate["slug"]}")
    VALID_PATHS.add(f"/en/uae/{emirate["slug"]}")
    VALID_PATHS.add(f"https://bietalreef.ae/en/uae/{emirate["slug"]}")

    for area in emirate["areas"]:
        VALID_PATHS.add(f"/uae/{emirate["slug"]}/{area["slug"]}")
        VALID_PATHS.add(f"https://bietalreef.ae/uae/{emirate["slug"]}/{area["slug"]}")
        VALID_PATHS.add(f"/en/uae/{emirate["slug"]}/{area["slug"]}")
        VALID_PATHS.add(f"https://bietalreef.ae/en/uae/{emirate["slug"]}/{area["slug"]}")

        for service in SERVICE_CATEGORIES:
            VALID_PATHS.add(f"/uae/{emirate["slug"]}/{area["slug"]}/{service["slug"]}")
            VALID_PATHS.add(f"https://bietalreef.ae/uae/{emirate["slug"]}/{area["slug"]}/{service["slug"]}")
            VALID_PATHS.add(f"/en/uae/{emirate["slug"]}/{area["slug"]}/{service["slug"]}")
            VALID_PATHS.add(f"https://bietalreef.ae/en/uae/{emirate["slug"]}/{area["slug"]}/{service["slug"]}")

# Add category pages
for service in SERVICE_CATEGORIES:
    VALID_PATHS.add(f"/categories/{service["slug"]}")
    VALID_PATHS.add(f"https://bietalreef.ae/categories/{service["slug"]}")
    VALID_PATHS.add(f"/en/categories/{service["slug"]}")
    VALID_PATHS.add(f"https://bietalreef.ae/en/categories/{service["slug"]}")

# Add blog pages (assuming blog slugs are dynamic)
VALID_PATHS.add("/blog/any-slug") # Placeholder for dynamic blog slugs
VALID_PATHS.add("https://bietalreef.ae/blog/any-slug")

# Add product and provider pages (assuming dynamic slugs)
VALID_PATHS.add("/product/any-slug")
VALID_PATHS.add("https://bietalreef.ae/product/any-slug")
VALID_PATHS.add("/provider/any-slug")
VALID_PATHS.add("https://bietalreef.ae/provider/any-slug")
VALID_PATHS.add("/en/product/any-slug")
VALID_PATHS.add("https://bietalreef.ae/en/product/any-slug")
VALID_PATHS.add("/en/provider/any-slug")
VALID_PATHS.add("https://bietalreef.ae/en/provider/any-slug")

# Add sitemap.xml.js
VALID_PATHS.add("/sitemap.xml")
VALID_PATHS.add("https://bietalreef.ae/sitemap.xml")

# Add map pages
for emirate in UAE_EMIRATES:
    for area in emirate["areas"]:
        VALID_PATHS.add(f"/en/map/{area["slug"]}")
        VALID_PATHS.add(f"https://bietalreef.ae/en/map/{area["slug"]}")
        for service in SERVICE_CATEGORIES:
            VALID_PATHS.add(f"/en/map/{area["slug"]}/{service["slug"]}")
            VALID_PATHS.add(f"https://bietalreef.ae/en/map/{area["slug"]}/{service["slug"]}")

# Add public assets
public_dir = "/home/ubuntu/bietalreef-landing-new/public"
for root, _, files in os.walk(public_dir):
    for file in files:
        relative_path = os.path.join(root, file).replace(public_dir, "").replace(os.sep, "/")
        VALID_PATHS.add(relative_path)
        VALID_PATHS.add(f"https://bietalreef.ae{relative_path}")


# Read internal_links.txt
with open("/home/ubuntu/bietalreef-landing-new/internal_links.txt", "r", encoding="utf-8") as f:
    found_internal_links = [line.strip() for line in f if line.strip()]

broken_links = []
for link in found_internal_links:
    is_valid = False
    # Check for exact match
    if link in VALID_PATHS:
        is_valid = True
    # Check for dynamic matches (e.g., /blog/some-post-slug)
    elif link.startswith("/blog/") and "/blog/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("https://bietalreef.ae/blog/") and "https://bietalreef.ae/blog/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("/product/") and "/product/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("https://bietalreef.ae/product/") and "https://bietalreef.ae/product/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("/provider/") and "/provider/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("https://bietalreef.ae/provider/") and "https://bietalreef.ae/provider/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("/en/product/") and "/en/product/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("https://bietalreef.ae/en/product/") and "https://bietalreef.ae/en/product/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("/en/provider/") and "/en/provider/any-slug" in VALID_PATHS:
        is_valid = True
    elif link.startswith("https://bietalreef.ae/en/provider/") and "https://bietalreef.ae/en/provider/any-slug" in VALID_PATHS:
        is_valid = True

    if not is_valid:
        broken_links.append(link)

with open("/home/ubuntu/bietalreef-landing-new/broken_internal_links.txt", "w", encoding="utf-8") as f:
    if broken_links:
        for link in sorted(broken_links):
            f.write(link + "\n")
    else:
        f.write("No broken internal links found.\n")

print(f"Found {len(broken_links)} broken internal links.")
