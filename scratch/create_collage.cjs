const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

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
    const collage = new Jimp({ width: canvasWidth, height: canvasHeight, color: 0xFFFFFFFF });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(picturesDir, file);
      
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const x = col * thumbWidth + (col + 1) * spacing;
      const y = row * thumbHeight + (row + 1) * spacing;

      try {
        const img = await Jimp.read(filePath);
        img.cover({ w: thumbWidth, h: thumbHeight });
        
        // Composite image onto canvas
        collage.composite(img, x, y);
        console.log(`Placed: ${file} at grid position [${row}, ${col}]`);
      } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
      }
    }

    await collage.write(outputCollage);
    console.log(`\nSuccessfully wrote collage to ${outputCollage}`);
  } catch (error) {
    console.error("Collage failed:", error);
  }
}

createCollage();
