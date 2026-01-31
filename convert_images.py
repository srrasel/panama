import os
from PIL import Image

# Directory path
directory = r"d:\Docker Project\hd\modern-lms-landing-page\public\student_life"

# List of files that should be PNGs (based on previous analysis)
png_files = [
    "icon_first-aid",
    "icons8-safety-500",
    "icon_peopleattable",
    "icon_venn-diagram",
    "icon_map",
    "icons8-community-500"
]

# Iterate over files in directory
for filename in os.listdir(directory):
    if filename.endswith(".webp"):
        filepath = os.path.join(directory, filename)
        name_without_ext = os.path.splitext(filename)[0]
        
        try:
            with Image.open(filepath) as im:
                # Determine target format and extension
                if name_without_ext in png_files:
                    target_ext = ".png"
                    target_format = "PNG"
                    # PNG supports transparency, so we keep RGBA if present
                    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                        img_to_save = im.convert('RGBA')
                    else:
                        img_to_save = im.convert('RGB')
                else:
                    target_ext = ".jpg"
                    target_format = "JPEG"
                    # JPEG doesn't support transparency, convert to RGB
                    img_to_save = im.convert('RGB')
                
                new_filepath = os.path.join(directory, name_without_ext + target_ext)
                
                print(f"Converting {filename} to {name_without_ext}{target_ext}...")
                img_to_save.save(new_filepath, target_format, quality=95)
                
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

print("Conversion complete.")