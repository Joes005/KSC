with open("src/pages/Home.tsx") as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if "function Home()" in line:
        print(f"Line: {i+1}")
        break
