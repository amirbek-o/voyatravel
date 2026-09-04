const fs = require('fs');
const path = require('path');

const rootDir = 'd:/triptour-compliance';
const publicHotelsDir = path.join(rootDir, 'public', 'images', 'hotels');

if (!fs.existsSync(publicHotelsDir)) {
  fs.mkdirSync(publicHotelsDir, { recursive: true });
}

// 1. Move files
const filesToMove = [
  "Albora_hotel.webp",
  "Alis_hotel.avif",
  "golden_lotus_hotel.jpg",
  "grand_gmp.jpg",
  "liman_hotel.jpg",
  "momentum_hotel.jpg",
  "new_badawia_hotel.png",
  "qeroli_old_town.avif",
  "red_castle.jpg",
  "soleil_hotel.jpg",
  "t5_suites.jpg",
  "uni_sharm.jpg"
];

filesToMove.forEach(file => {
  const oldPath = path.join(rootDir, file);
  const newPath = path.join(publicHotelsDir, file);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${file}`);
  }
});

// 2. Update JSON
const dataPath = path.join(rootDir, 'src', 'data', 'scraped-tours.json');
const tours = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Create a mapping of hotel name (lowercase) to image filename
const mapping = {
  "albora hotel": "Albora_hotel.webp",
  "alis hotel": "Alis_hotel.avif",
  "golden lotus hotel": "golden_lotus_hotel.jpg",
  "grand gmp": "grand_gmp.jpg",
  "liman hotel": "liman_hotel.jpg",
  "momentum hotel": "momentum_hotel.jpg",
  "new badawia sharm resort": "new_badawia_hotel.png",
  "new badawia sharm": "new_badawia_hotel.png",
  "qeroli old town": "qeroli_old_town.avif",
  "red castle": "red_castle.jpg",
  "soleil hotel": "soleil_hotel.jpg",
  "t5 suites @ pattaya": "t5_suites.jpg",
  "uni sharm": "uni_sharm.jpg"
};

tours.forEach(tour => {
  const hotelNameLower = tour.hotel.name.toLowerCase();
  if (mapping[hotelNameLower]) {
    tour.imageUrl = `/images/hotels/${mapping[hotelNameLower]}`;
    console.log(`Updated ${tour.hotel.name} to use local image`);
  }
});

fs.writeFileSync(dataPath, JSON.stringify(tours, null, 2), 'utf8');
console.log("Done updating JSON");
