from PIL import Image

def inspect_image(path):
    img = Image.open(path)
    print(f"{path}: size={img.size}, format={img.format}")

inspect_image("public/hero-section-logo/card-experts.jpeg")
inspect_image("public/hero-section-logo/card-projects.jpeg")
inspect_image("public/hero-section-logo/card-lms.jpeg")
inspect_image("public/hero-section-logo/card-placement.jpeg")
