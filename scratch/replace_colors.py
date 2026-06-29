import re

# File paths
index_css_path = 'src/index.css'
app_tsx_path = 'src/App.tsx'
enrollment_page_path = 'src/components/EnrollmentPage.tsx'
services_page_path = 'src/components/ServicesPage.tsx'

# Color replacement mapping
replacements = [
    # Hex colors (case-insensitive)
    (re.compile(r'#0284c7\b', re.IGNORECASE), '#018fff'),
    (re.compile(r'#0ea5e9\b', re.IGNORECASE), '#018fff'),
    (re.compile(r'#0369a1\b', re.IGNORECASE), '#0066cc'),
    (re.compile(r'#7c3aed\b', re.IGNORECASE), '#051f40'),
    (re.compile(r'#6d28d9\b', re.IGNORECASE), '#031326'),
    (re.compile(r'#4f46e5\b', re.IGNORECASE), '#018fff'),
    (re.compile(r'#4338ca\b', re.IGNORECASE), '#0066cc'),
    (re.compile(r'#db2777\b', re.IGNORECASE), '#051f40'),
    (re.compile(r'#be185d\b', re.IGNORECASE), '#031326'),
    (re.compile(r'#ea580c\b', re.IGNORECASE), '#018fff'),
    (re.compile(r'#c2410c\b', re.IGNORECASE), '#0076d6'),
    (re.compile(r'#0d9488\b', re.IGNORECASE), '#051f40'),
    (re.compile(r'#0f766e\b', re.IGNORECASE), '#031326'),
    (re.compile(r'#a78bfa\b', re.IGNORECASE), '#38bdf8'),
    (re.compile(r'#818cf8\b', re.IGNORECASE), '#38bdf8'),
    (re.compile(r'#f472b6\b', re.IGNORECASE), '#38bdf8'),
    (re.compile(r'#fb923c\b', re.IGNORECASE), '#38bdf8'),
    (re.compile(r'#2dd4bf\b', re.IGNORECASE), '#38bdf8'),
    
    # rgb/rgba replacements
    (re.compile(r'rgba\(2,\s*132,\s*199,', re.IGNORECASE), 'rgba(1, 143, 255,'),
    (re.compile(r'rgba\(124,\s*58,\s*237,', re.IGNORECASE), 'rgba(5, 31, 64,'),
    (re.compile(r'rgba\(79,\s*70,\s*229,', re.IGNORECASE), 'rgba(1, 143, 255,'),
    (re.compile(r'rgba\(219,\s*39,\s*119,', re.IGNORECASE), 'rgba(5, 31, 64,'),
    (re.compile(r'rgba\(234,\s*88,\s*12,', re.IGNORECASE), 'rgba(1, 143, 255,'),
    (re.compile(r'rgba\(13,\s*148,\s*136,', re.IGNORECASE), 'rgba(5, 31, 64,'),
    
    # Specific rgb color strings
    ('2, 132, 199', '1, 143, 255'),
    ('124, 58, 237', '5, 31, 64'),
    ('79, 70, 229', '1, 143, 255'),
    ('219, 39, 119', '5, 31, 64'),
    ('234, 88, 12', '1, 143, 255'),
    ('13, 148, 136', '5, 31, 64')
]

# 1. Modify src/index.css
with open(index_css_path, 'r', encoding='utf-8') as f:
    content = f.read()

original_length = len(content)
for pattern, replacement in replacements:
    if isinstance(pattern, re.Pattern):
        content = pattern.sub(replacement, content)
    else:
        content = content.replace(pattern, replacement)

# Add CSS rules to remove blue lines from all dark blue background sections
removal_css = """

/* ==========================================================================
   Custom overrides: Remove blue lines from all dark blue background sections
   ========================================================================== */
.programs-section-header .section-title-divider::after,
.course-syllabus-banner .section-title-divider::after,
.about-hero-section .about-title-underline,
.agentic-solutions-bg .title-underline {
  display: none !important;
}
"""
content += removal_css

with open(index_css_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Updated {index_css_path} (length changed from {original_length} to {len(content)})")

# 2. Modify src/App.tsx
with open(app_tsx_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('#0284c7', '#018fff')
with open(app_tsx_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Updated {app_tsx_path}")

# 3. Modify src/components/EnrollmentPage.tsx
with open(enrollment_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('#0284c7', '#018fff')
with open(enrollment_page_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Updated {enrollment_page_path}")

# 4. Modify src/components/ServicesPage.tsx
with open(services_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the layer colors in techStack
services_replacements = [
    ("color: '#db2777'", "color: '#051f40'"),
    ("color: '#0d9488'", "color: '#018fff'"),
    ("color: '#ea580c'", "color: '#051f40'"),
    ("color: '#4f46e5'", "color: '#018fff'"),
    ("color: '#7c3aed'", "color: '#051f40'"),
    ("color: '#0284c7'", "color: '#018fff'"),
    ("backgroundColor: '#db2777'", "backgroundColor: '#018fff'"),
    ('stopColor="#0284c7"', 'stopColor="#018fff"'),
    ('stopColor="#0369a1"', 'stopColor="#0066cc"'),
    ('stopColor="#0ea5e9"', 'stopColor="#018fff"'),
]

for old, new in services_replacements:
    content = content.replace(old, new)

with open(services_page_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"Updated {services_page_path}")
