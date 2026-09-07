const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = ['scraped-tours.json', 'tours-en.json', 'tours-ru.json', 'tours-uz.json'];

const imageMap = {
  // Paris
  "Parij": "/images/hotels/paris.jpg",
  "Paris": "/images/hotels/paris.jpg",
  "Париж": "/images/hotels/paris.jpg",
  
  // Samarkand
  "Samarqand": "/images/hotels/samarqand.jpg",
  "Samarkand": "/images/hotels/samarqand.jpg",
  "Самарканд": "/images/hotels/samarqand.jpg",
  
  // Istanbul
  "Istanbul": "/images/hotels/istanbul.png",
  "Stambul": "/images/hotels/istanbul.png",
  "Стамбул": "/images/hotels/istanbul.png",
  
  // Kuala-Lumpur
  "Kuala-Lumpur": "/images/hotels/kuala_lumpur.jpg",
  "Kuala Lumpur": "/images/hotels/kuala_lumpur.jpg",
  "Куала-Лумпур": "/images/hotels/kuala_lumpur.jpg",

  // Hadaba
  "HADABA": "/images/hotels/new_badawia_hotel.png", // or uni_sharm, I will map all Hadaba to one of them, let's use new_badawia_hotel.png or golden_lotus_hotel.jpg. I'll search the JSON for HADABA.
  "Hadaba": "/images/hotels/new_badawia_hotel.png",
  "ХАДАБА": "/images/hotels/new_badawia_hotel.png",
  "Хадаба": "/images/hotels/new_badawia_hotel.png"
};

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.forEach(tour => {
    const town = tour.destination.town;
    if (imageMap[town]) {
      tour.imageUrl = imageMap[town];
    } else {
        // Just in case it's an uppercase issue
        const keys = Object.keys(imageMap);
        for (let k of keys) {
            if (town && town.toLowerCase() === k.toLowerCase()) {
                tour.imageUrl = imageMap[k];
            }
        }
    }
  });
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log("Images updated successfully.");
