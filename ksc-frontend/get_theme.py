import urllib.request
import re
from bs4 import BeautifulSoup

url = "https://www.setcollege.in/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    print("=== Title ===")
    print(soup.title.string if soup.title else "No title")
    
    print("\n=== Stylesheets ===")
    css_urls = []
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href')
        if href:
            if href.startswith('/'):
                href = "https://www.setcollege.in" + href
            elif not href.startswith('http'):
                href = "https://www.setcollege.in/" + href
            css_urls.append(href)
            print(href)
            
    # Try to extract inline styles or script variables
    colors = set(re.findall(r'#[0-9a-fA-F]{3,6}', html))
    print("\n=== Colors in HTML ===")
    print(colors)
    
except Exception as e:
    print(f"Error: {e}")
