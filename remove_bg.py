import sys
import time

def process_image():
    try:
        from rembg import remove
        from PIL import Image
        
        input_path = r'd:\Portfolio\assets\images\user-original.jpg'
        output_path = r'd:\Portfolio\assets\images\user-hero-cutout.png'
        
        print(f"Loading image from {input_path}...")
        inp = Image.open(input_path)
        print("Removing background with rembg AI...")
        output = remove(inp)
        output.save(output_path)
        print(f"Successfully saved cutout image to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        # Fallback: create cropped version with rounded mask or stylized frame if rembg is unavailable
        from PIL import Image, ImageDraw
        inp = Image.open(r'd:\Portfolio\assets\images\user-original.jpg')
        # Crop person
        width, height = inp.size
        # The user is in the middle-left right portion, let's crop person area nicely
        crop_box = (int(width * 0.25), int(height * 0.2), int(width * 0.65), int(height * 0.8))
        cropped = inp.crop(crop_box)
        cropped.save(r'd:\Portfolio\assets\images\user-cropped.jpg')
        print("Fallback cropped image saved.")

if __name__ == '__main__':
    process_image()
