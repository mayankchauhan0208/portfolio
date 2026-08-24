from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

root = Path(r"C:\Users\pc\Documents\Portfolio")
out = root / "public" / "social-preview.png"
w, h = 1200, 630
canvas = Image.new("RGB", (w, h), "#07080b")

# restrained blue-purple atmosphere
glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((-180, -120, 520, 580), fill=(55, 179, 225, 90))
gd.ellipse((720, -160, 1420, 540), fill=(115, 86, 220, 85))
glow = glow.filter(ImageFilter.GaussianBlur(115))
canvas = Image.alpha_composite(canvas.convert("RGBA"), glow)

draw = ImageDraw.Draw(canvas)
draw.rounded_rectangle((54, 54, 1146, 576), radius=32, fill=(9, 12, 18, 220), outline=(150, 175, 220, 45), width=2)
draw.line((86, 102, 1114, 102), fill=(142, 232, 255, 95), width=2)

font_dir = Path(r"C:\Windows\Fonts")
bold = font_dir / "arialbd.ttf"
regular = font_dir / "arial.ttf"
name_font = ImageFont.truetype(str(bold), 28)
title_font = ImageFont.truetype(str(bold), 64)
body_font = ImageFont.truetype(str(regular), 25)
tag_font = ImageFont.truetype(str(bold), 18)

draw.text((88, 132), "MAYANK CHAUHAN", font=name_font, fill=(142, 232, 255, 255))
draw.text((88, 205), "Senior Visual Designer", font=title_font, fill=(250, 252, 255, 255))
draw.text((88, 278), "Senior Graphic Designer", font=title_font, fill=(220, 224, 232, 255))
draw.multiline_text((91, 382), "Brand systems, campaign visuals, presentations\nand multi-format creative delivery.", font=body_font, fill=(185, 193, 207, 255), spacing=10)

tags = ["BRAND", "CAMPAIGN", "DIGITAL", "PRINT", "MOTION"]
x = 88
for tag in tags:
    box = draw.textbbox((0, 0), tag, font=tag_font)
    tw = box[2] - box[0]
    draw.rounded_rectangle((x, 505, x + tw + 30, 548), radius=20, fill=(18, 25, 37, 255), outline=(128, 154, 190, 130), width=1)
    draw.text((x + 15, 517), tag, font=tag_font, fill=(205, 225, 242, 255))
    x += tw + 42

canvas.convert("RGB").save(out, "PNG", optimize=True)
print(out)
