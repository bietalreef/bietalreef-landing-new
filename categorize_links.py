import re

def categorize_links(file_path):
    internal_links = set()
    external_links = set()
    ignored_links = set()

    with open(file_path, 'r') as f:
        for line in f:
            link = line.strip()
            if not link:
                continue

            if link.startswith('/') and not link.startswith('//'):
                # Internal relative path
                internal_links.add(link)
            elif link.startswith('http://') or link.startswith('https://'):
                # External absolute URL
                if 'bietalreef.ae' in link and not 'app.bietalreef.ae' in link:
                    internal_links.add(link) # Treat bietalreef.ae domains as internal, except app.bietalreef.ae
                else:
                    external_links.add(link)
            elif link.startswith('mailto:') or link.startswith('tel:'):
                ignored_links.add(link)
            else:
                # Other types of links or relative paths that might be problematic
                internal_links.add(link)

    return list(internal_links), list(external_links), list(ignored_links)

if __name__ == '__main__':
    internal, external, ignored = categorize_links('/home/ubuntu/bietalreef-landing-new/extracted_hrefs.txt')

    with open('/home/ubuntu/bietalreef-landing-new/internal_links.txt', 'w') as f:
        for link in sorted(internal):
            f.write(link + '\n')

    with open('/home/ubuntu/bietalreef-landing-new/external_links.txt', 'w') as f:
        for link in sorted(external):
            f.write(link + '\n')

    with open('/home/ubuntu/bietalreef-landing-new/ignored_links.txt', 'w') as f:
        for link in sorted(ignored):
            f.write(link + '\n')

    print(f"Categorized {len(internal)} internal, {len(external)} external, and {len(ignored)} ignored links.")
