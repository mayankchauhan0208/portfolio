from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Mayank-Chauhan-Resume.pdf"
SOURCE = ROOT / "resume" / "Mayank-Chauhan-Resume-source.txt"

NAVY = colors.HexColor("#182033")
TEAL = colors.HexColor("#0D6677")
MUTED = colors.HexColor("#4E5968")
LINE = colors.HexColor("#CBD5DF")

styles = getSampleStyleSheet()
name = ParagraphStyle("Name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=20, leading=22, alignment=TA_CENTER, textColor=NAVY, spaceAfter=2)
headline = ParagraphStyle("Headline", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=11.5, leading=14, alignment=TA_CENTER, textColor=TEAL, spaceAfter=3)
contact = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=9.5, leading=12, alignment=TA_CENTER, textColor=MUTED, spaceAfter=8)
section = ParagraphStyle("Section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=TEAL, spaceBefore=6.5, spaceAfter=3, borderWidth=0, borderPadding=0)
body = ParagraphStyle("Body", parent=styles["Normal"], fontName="Helvetica", fontSize=10, leading=14.0, textColor=NAVY, spaceAfter=3.5)
role = ParagraphStyle("Role", parent=body, fontName="Helvetica-Bold", spaceBefore=6, spaceAfter=3)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=10, firstLineIndent=-7, bulletIndent=0, spaceAfter=2.5)
label = ParagraphStyle("Label", parent=body, fontName="Helvetica-Bold", textColor=NAVY, spaceBefore=2, spaceAfter=1)
small = ParagraphStyle("Small", parent=body, fontSize=9.5, leading=13)

def p(text, style=body):
    return Paragraph(text, style)

def add_section(story, title):
    story.append(p(title.upper(), section))
    story.append(Spacer(1, 0.5 * mm))

def add_role(story, heading, bullets):
    block = [p(heading, role)]
    block.extend(p(f"- {item}", bullet) for item in bullets)
    story.append(KeepTogether(block))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.4)
    canvas.line(18 * mm, 13 * mm, 192 * mm, 13 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(105 * mm, 8.5 * mm, f"Mayank Chauhan | Page {doc.page} of 2")
    if doc.page == 1:
        qr = QrCodeWidget("https://mayankchauhan.co.in")
        x1, y1, x2, y2 = qr.getBounds()
        qr_size = 13 * mm
        drawing = Drawing(qr_size, qr_size, transform=[qr_size / (x2 - x1), 0, 0, qr_size / (y2 - y1), 0, 0])
        drawing.add(qr)
        qr_x, qr_y = 179 * mm, 269 * mm
        drawing.drawOn(canvas, qr_x, qr_y)
        canvas.linkURL("https://mayankchauhan.co.in", (qr_x, qr_y, qr_x + qr_size, qr_y + qr_size), relative=0)
        canvas.setFont("Helvetica", 5.5)
        canvas.setFillColor(MUTED)
        canvas.drawCentredString(qr_x + qr_size / 2, qr_y - 2.2 * mm, "PORTFOLIO")
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=13 * mm, bottomMargin=17 * mm, title="Mayank Chauhan - Senior Visual Designer | Senior Graphic Designer", author="Mayank Chauhan")
story = []
story += [
    p("MAYANK CHAUHAN", name),
    p("Senior Visual Designer | Senior Graphic Designer", headline),
    p(
        '<link href="tel:+919992713289" color="#4E5968">+91 9992713289</link> | '
        '<link href="mailto:connect.mayankchauhan@gmail.com" color="#0D6677">connect.mayankchauhan@gmail.com</link><br/>'
        '<link href="https://mayankchauhan.co.in" color="#0D6677">mayankchauhan.co.in</link> | '
        '<link href="https://www.linkedin.com/in/mayankchauhan0208/" color="#0D6677">LinkedIn</link> | <link href="https://www.behance.net/mayankchauhan0208" color="#0D6677">Behance</link>',
        contact,
    ),
]

add_section(story, "Professional Profile")
story.append(p("Senior visual and graphic designer with 5+ years of experience leading visual execution across brand communication, campaign systems, presentations, digital and print collateral, UI/UX visual concepts, and motion-led content. Translates marketing and sales briefs into consistent, production-ready systems through clear hierarchy, refined typography, stakeholder collaboration, multi-format adaptation, and final quality control. Uses AI-assisted workflows as a supporting capability for exploration and production acceleration while maintaining designer-led direction."))

add_section(story, "Core Skills")
skills = [
    ("Brand &amp; Marketing", "Brand Communication | Campaign Design | Performance Creatives | Social Media | Presentation Design | Digital &amp; Print Production"),
    ("Visual Craft", "Typography | Layout Design | Colour Theory | Visual Hierarchy | Image Treatment &amp; Retouching"),
    ("Digital &amp; Motion", "Figma | UI Visual Concepts | Motion Graphics | Video Editing | Multi-format Adaptation"),
    ("Workflow &amp; Collaboration", "Stakeholder Collaboration | Creative Quality Control | Version Management | Production-ready Delivery"),
    ("AI-Enhanced Workflow", "Concept Exploration | Image Development | Creative Variations | Motion Experimentation | Production Acceleration | Designer-led Quality Control"),
]
for heading, text in skills:
    story.append(p(f"<b>{heading}:</b> {text}", small))

add_section(story, "Professional Experience")
add_role(story, "Property Master Pvt. Ltd. | Senior Graphic Designer | October 2025 - Present", [
    "Own visual execution supporting 8-12 property projects and 40-60 creative assets per month across six digital, presentation, print, thumbnail, and video-led format groups.",
    "Apply typography, layout design, colour theory and visual hierarchy to produce clear, brand-consistent campaign assets across digital, print and presentation formats.",
    "Coordinate marketing, sales, and management feedback, typically adapting master campaign directions into 5-8 format variations.",
    "Maintain visual quality across recurring campaigns, multi-format adaptations, and time-sensitive sales-support deliverables.",
])
add_role(story, "Property Master Pvt. Ltd. | Freelance Graphic Designer (Concurrent) | May 2024 - September 2025", [
    "Delivered real-estate campaign creatives, presentation assets, and sales-support communication on a concurrent freelance basis.",
    "Adapted core campaign directions across social, presentation, digital, and print requirements before moving into the full-time senior role.",
])
add_role(story, "Caterpillar Signs Pvt. Ltd. (Group Bayport) | Graphic Designer | September 2022 - September 2025", [
    "Produced 25-40 monthly brand and marketing assets across campaigns, presentations, social communication, collateral, signage, and print production.",
    "Maintained consistency through disciplined typography, spacing, alignment, image treatment, resizing, version control, and final visual quality checks.",
    "Translated stakeholder briefs and feedback into execution-ready assets across multiple formats and deadlines.",
    "Maintained repeatable visual systems while preserving brand consistency and production accuracy.",
])
add_role(story, "7P Digital Services LLP | Graphic Designer and Video Editor | March 2022 - September 2022", [
    "Created 20-30 static and motion assets per month across digital campaigns, social media, promotional graphics, and platform-specific communication.",
    "Edited reels and promotional videos in Premiere Pro and After Effects, balancing pacing, readable titles, and visual consistency.",
    "Adapted static and motion assets across required formats while maintaining hierarchy and brand alignment.",
])

add_role(story, "CityMall, Gurugram | Marketing Intern | December 2021 - March 2022", ["Supported marketing design production through marketplace visuals, promotional graphics, digital communication, and brand-sensitive asset preparation."])
add_role(story, "Krash IT Services | Graphic Designer Intern | May 2021 - October 2021", ["Supported layout development, visual cleanup, typography, image preparation, and practical production-ready design workflows."])
add_role(story, "YPR Eng. and Sol. Pvt. Ltd. | Graphic Designer Intern | December 2020 - May 2021", ["Assisted with graphic-design layouts, presentation and brochure support, creative preparation, and visual asset development for business communication."])

add_section(story, "Selected Portfolio Highlights")
projects = [
    ("Property Master Real Estate Campaigns", "EMPLOYER WORK", "Campaign and sales-support communication adapted across presentations, brochures, social media, performance advertising, print collateral, thumbnails, and video-led formats. Role: campaign execution, stakeholder revisions, production preparation, multi-format adaptation, and final quality control."),
    ("Caterpillar Signs Pvt. Ltd. (Group Bayport) Brand and Marketing Communication", "EMPLOYER WORK", "Corporate presentations, campaign creatives, social assets, promotional collateral, signage-support layouts, and print production. Role: design production, visual consistency, version control, internal collaboration, and final visual checks."),
    ("KENT Water Purifier Digital Brand Experience", "PERSONAL CONCEPT - NOT COMMISSIONED BY KENT", "Self-directed digital brand and presentation concept covering product storytelling, interface hierarchy, design-system views, trust cues, and campaign-ready visual expression."),
    ("Emaar India Business Centre Visual Exploration", "AI-ASSISTED PERSONAL CONCEPT - NOT COMMISSIONED BY EMAAR", "Designer-led AI-assisted architecture exploration across day, dusk, night, and elevated views. Role: prompt direction, output selection, image refinement, Photoshop treatment, consistency review, and campaign-style presentation."),
]
for title, classification, description in projects:
    story.append(KeepTogether([p(title, label), p(classification, ParagraphStyle("Class", parent=small, fontName="Helvetica-Bold", fontSize=9.5, leading=11.5, textColor=TEAL, spaceAfter=1)), p(description, small)]))

add_section(story, "Tools")
story.append(p("Adobe Photoshop | Adobe Illustrator | Adobe InDesign | Adobe Premiere Pro | Adobe After Effects | Adobe XD | Figma | Canva | Microsoft PowerPoint | Google Flow", small))

add_section(story, "Education")
story.append(p("<b>Bachelor of Science in Animation and Multimedia, First Division</b><br/>J.C. Bose University of Science and Technology, YMCA, Faridabad | 2022", small))
story.append(p("<b>Senior Secondary</b><br/>S.N.D. Public School, Palwal, Haryana | CBSE | Science (Non-Medical) | 2019", small))
story.append(p("<b>Secondary Education</b><br/>B.S.M. High School, Hazipur, Gurugram, Haryana | HBSE | 2017", small))

add_section(story, "Languages")
story.append(p("English | Hindi", small))

doc.build(story, onFirstPage=footer, onLaterPages=footer)

with pdfplumber.open(OUTPUT) as pdf:
    pages = [page.extract_text() or "" for page in pdf.pages]
SOURCE.write_text("\n\n===== PAGE BREAK =====\n\n".join(pages) + "\n", encoding="utf-8")
print(OUTPUT)
