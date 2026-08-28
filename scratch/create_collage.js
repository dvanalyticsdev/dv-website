import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

const picturesDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\alumni-pictures";
const outputCollage = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\scratch\\alumni_collage.png";

async function createCollage() {
  try {
    const files = fs.readdirSync(picturesDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpeg' || ext === '.jpg' || ext === '.png';
    });

    console.log(`Found ${files.length} images to combine.`);

    const thumbWidth = 150;
    const thumbHeight = 180;
    const cols = 6;
    const rows = Math.ceil(files.length / cols);
    const spacing = 15;

    const canvasWidth = cols * thumbWidth + (cols + 1) * spacing;
    const canvasHeight = rows * thumbHeight + (rows + 1) * spacing;

    // Create a new blank white image
    const collage = new Jimp(canvasWidth, canvasHeight, 0xFFFFFFFF);
    
    // Load standard font for drawing indices
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(picturesDir, file);
      
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const x = col * thumbWidth + (col + 1) * spacing;
      const y = row * thumbHeight + (row + 1) * spacing;

      try {
        const img = await Jimp.read(filePath);
        img.cover(thumbWidth, thumbHeight);
        
        // Composite image onto canvas
        collage.composite(img, x, y);
        
        // Draw index and filename on the thumbnail
        const label = `${i + 1}. ${file.replace(/\.[^/.]+$/, "")}`;
        collage.print(font, x + 5, y + thumbHeight - 25, label);
        console.log(`Placed: ${file} at grid position [${row}, ${col}]`);
      } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
      }
    }

    await collage.writeAsync(outputCollage);
    console.log(`\nSuccessfully wrote collage to ${outputCollage}`);
  } catch (error) {
    console.error("Collage failed:", error);
  }
}

createCollage();
