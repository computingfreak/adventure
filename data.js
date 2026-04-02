const ACTIVITY_SETS = [
  ["Culture", "Food", "Museums"],
  ["Beach", "Relaxation", "Nightlife"],
  ["Adventure", "Hiking", "Nature"],
  ["History", "Architecture", "Walking Tours"],
  ["Wildlife", "Photography", "Road Trips"],
  ["Ski", "Snow", "Scenic Rail"],
  ["Wellness", "Hot Springs", "Slow Travel"],
  ["Diving", "Island Hopping", "Sailing"],
];

const DESTINATIONS_RAW = [
  ["Tokyo", "Japan", "Asia", 35.6762, 139.6503, "JPY", "Asia/Tokyo"],
  ["Kyoto", "Japan", "Asia", 35.0116, 135.7681, "JPY", "Asia/Tokyo"],
  ["Osaka", "Japan", "Asia", 34.6937, 135.5023, "JPY", "Asia/Tokyo"],
  ["Seoul", "South Korea", "Asia", 37.5665, 126.9780, "KRW", "Asia/Seoul"],
  ["Busan", "South Korea", "Asia", 35.1796, 129.0756, "KRW", "Asia/Seoul"],
  ["Bangkok", "Thailand", "Asia", 13.7563, 100.5018, "THB", "Asia/Bangkok"],
  ["Chiang Mai", "Thailand", "Asia", 18.7883, 98.9853, "THB", "Asia/Bangkok"],
  ["Phuket", "Thailand", "Asia", 7.8804, 98.3923, "THB", "Asia/Bangkok"],
  ["Singapore", "Singapore", "Asia", 1.3521, 103.8198, "SGD", "Asia/Singapore"],
  ["Bali", "Indonesia", "Asia", -8.4095, 115.1889, "IDR", "Asia/Makassar"],
  ["Jakarta", "Indonesia", "Asia", -6.2088, 106.8456, "IDR", "Asia/Jakarta"],
  ["Hanoi", "Vietnam", "Asia", 21.0278, 105.8342, "VND", "Asia/Ho_Chi_Minh"],
  ["Ho Chi Minh City", "Vietnam", "Asia", 10.8231, 106.6297, "VND", "Asia/Ho_Chi_Minh"],
  ["Da Nang", "Vietnam", "Asia", 16.0544, 108.2022, "VND", "Asia/Ho_Chi_Minh"],
  ["Kuala Lumpur", "Malaysia", "Asia", 3.1390, 101.6869, "MYR", "Asia/Kuala_Lumpur"],
  ["Penang", "Malaysia", "Asia", 5.4141, 100.3288, "MYR", "Asia/Kuala_Lumpur"],
  ["Hong Kong", "China", "Asia", 22.3193, 114.1694, "HKD", "Asia/Hong_Kong"],
  ["Taipei", "Taiwan", "Asia", 25.0330, 121.5654, "TWD", "Asia/Taipei"],
  ["Beijing", "China", "Asia", 39.9042, 116.4074, "CNY", "Asia/Shanghai"],
  ["Shanghai", "China", "Asia", 31.2304, 121.4737, "CNY", "Asia/Shanghai"],
  ["Ulaanbaatar", "Mongolia", "Asia", 47.8864, 106.9057, "MNT", "Asia/Ulaanbaatar"],
  ["Delhi", "India", "Asia", 28.6139, 77.2090, "INR", "Asia/Kolkata"],
  ["Mumbai", "India", "Asia", 19.0760, 72.8777, "INR", "Asia/Kolkata"],
  ["Goa", "India", "Asia", 15.2993, 74.1240, "INR", "Asia/Kolkata"],
  ["Dubai", "UAE", "Middle East", 25.2048, 55.2708, "AED", "Asia/Dubai"],
  ["Abu Dhabi", "UAE", "Middle East", 24.4539, 54.3773, "AED", "Asia/Dubai"],
  ["Doha", "Qatar", "Middle East", 25.2854, 51.5310, "QAR", "Asia/Qatar"],
  ["Muscat", "Oman", "Middle East", 23.5880, 58.3829, "OMR", "Asia/Muscat"],
  ["Istanbul", "Türkiye", "Europe", 41.0082, 28.9784, "TRY", "Europe/Istanbul"],
  ["Cappadocia", "Türkiye", "Europe", 38.6431, 34.8284, "TRY", "Europe/Istanbul"],
  ["Athens", "Greece", "Europe", 37.9838, 23.7275, "EUR", "Europe/Athens"],
  ["Santorini", "Greece", "Europe", 36.3932, 25.4615, "EUR", "Europe/Athens"],
  ["Rome", "Italy", "Europe", 41.9028, 12.4964, "EUR", "Europe/Rome"],
  ["Florence", "Italy", "Europe", 43.7696, 11.2558, "EUR", "Europe/Rome"],
  ["Venice", "Italy", "Europe", 45.4408, 12.3155, "EUR", "Europe/Rome"],
  ["Milan", "Italy", "Europe", 45.4642, 9.1900, "EUR", "Europe/Rome"],
  ["Paris", "France", "Europe", 48.8566, 2.3522, "EUR", "Europe/Paris"],
  ["Nice", "France", "Europe", 43.7102, 7.2620, "EUR", "Europe/Paris"],
  ["Barcelona", "Spain", "Europe", 41.3874, 2.1686, "EUR", "Europe/Madrid"],
  ["Madrid", "Spain", "Europe", 40.4168, -3.7038, "EUR", "Europe/Madrid"],
  ["Lisbon", "Portugal", "Europe", 38.7223, -9.1393, "EUR", "Europe/Lisbon"],
  ["Porto", "Portugal", "Europe", 41.1579, -8.6291, "EUR", "Europe/Lisbon"],
  ["London", "UK", "Europe", 51.5072, -0.1276, "GBP", "Europe/London"],
  ["Edinburgh", "UK", "Europe", 55.9533, -3.1883, "GBP", "Europe/London"],
  ["Dublin", "Ireland", "Europe", 53.3498, -6.2603, "EUR", "Europe/Dublin"],
  ["Amsterdam", "Netherlands", "Europe", 52.3676, 4.9041, "EUR", "Europe/Amsterdam"],
  ["Brussels", "Belgium", "Europe", 50.8503, 4.3517, "EUR", "Europe/Brussels"],
  ["Berlin", "Germany", "Europe", 52.52, 13.4050, "EUR", "Europe/Berlin"],
  ["Munich", "Germany", "Europe", 48.1351, 11.5820, "EUR", "Europe/Berlin"],
  ["Prague", "Czechia", "Europe", 50.0755, 14.4378, "CZK", "Europe/Prague"],
  ["Vienna", "Austria", "Europe", 48.2082, 16.3738, "EUR", "Europe/Vienna"],
  ["Budapest", "Hungary", "Europe", 47.4979, 19.0402, "HUF", "Europe/Budapest"],
  ["Zurich", "Switzerland", "Europe", 47.3769, 8.5417, "CHF", "Europe/Zurich"],
  ["Interlaken", "Switzerland", "Europe", 46.6863, 7.8632, "CHF", "Europe/Zurich"],
  ["Copenhagen", "Denmark", "Europe", 55.6761, 12.5683, "DKK", "Europe/Copenhagen"],
  ["Stockholm", "Sweden", "Europe", 59.3293, 18.0686, "SEK", "Europe/Stockholm"],
  ["Oslo", "Norway", "Europe", 59.9139, 10.7522, "NOK", "Europe/Oslo"],
  ["Reykjavik", "Iceland", "Europe", 64.1466, -21.9426, "ISK", "Atlantic/Reykjavik"],
  ["Warsaw", "Poland", "Europe", 52.2297, 21.0122, "PLN", "Europe/Warsaw"],
  ["Krakow", "Poland", "Europe", 50.0647, 19.9450, "PLN", "Europe/Warsaw"],
  ["Zagreb", "Croatia", "Europe", 45.8150, 15.9819, "EUR", "Europe/Zagreb"],
  ["Dubrovnik", "Croatia", "Europe", 42.6507, 18.0944, "EUR", "Europe/Zagreb"],
  ["Cape Town", "South Africa", "Africa", -33.9249, 18.4241, "ZAR", "Africa/Johannesburg"],
  ["Johannesburg", "South Africa", "Africa", -26.2041, 28.0473, "ZAR", "Africa/Johannesburg"],
  ["Marrakech", "Morocco", "Africa", 31.6295, -7.9811, "MAD", "Africa/Casablanca"],
  ["Casablanca", "Morocco", "Africa", 33.5731, -7.5898, "MAD", "Africa/Casablanca"],
  ["Cairo", "Egypt", "Africa", 30.0444, 31.2357, "EGP", "Africa/Cairo"],
  ["Luxor", "Egypt", "Africa", 25.6872, 32.6396, "EGP", "Africa/Cairo"],
  ["Nairobi", "Kenya", "Africa", -1.2921, 36.8219, "KES", "Africa/Nairobi"],
  ["Mombasa", "Kenya", "Africa", -4.0435, 39.6682, "KES", "Africa/Nairobi"],
  ["Zanzibar", "Tanzania", "Africa", -6.1659, 39.2026, "TZS", "Africa/Dar_es_Salaam"],
  ["Kigali", "Rwanda", "Africa", -1.9706, 30.1044, "RWF", "Africa/Kigali"],
  ["Seychelles", "Seychelles", "Africa", -4.6796, 55.4920, "SCR", "Indian/Mahe"],
  ["Mauritius", "Mauritius", "Africa", -20.3484, 57.5522, "MUR", "Indian/Mauritius"],
  ["New York City", "USA", "North America", 40.7128, -74.0060, "USD", "America/New_York"],
  ["Boston", "USA", "North America", 42.3601, -71.0589, "USD", "America/New_York"],
  ["Washington, D.C.", "USA", "North America", 38.9072, -77.0369, "USD", "America/New_York"],
  ["Miami", "USA", "North America", 25.7617, -80.1918, "USD", "America/New_York"],
  ["Orlando", "USA", "North America", 28.5383, -81.3792, "USD", "America/New_York"],
  ["Chicago", "USA", "North America", 41.8781, -87.6298, "USD", "America/Chicago"],
  ["Austin", "USA", "North America", 30.2672, -97.7431, "USD", "America/Chicago"],
  ["Denver", "USA", "North America", 39.7392, -104.9903, "USD", "America/Denver"],
  ["Las Vegas", "USA", "North America", 36.1699, -115.1398, "USD", "America/Los_Angeles"],
  ["Los Angeles", "USA", "North America", 34.0522, -118.2437, "USD", "America/Los_Angeles"],
  ["San Francisco", "USA", "North America", 37.7749, -122.4194, "USD", "America/Los_Angeles"],
  ["Seattle", "USA", "North America", 47.6062, -122.3321, "USD", "America/Los_Angeles"],
  ["Vancouver", "Canada", "North America", 49.2827, -123.1207, "CAD", "America/Vancouver"],
  ["Toronto", "Canada", "North America", 43.6532, -79.3832, "CAD", "America/Toronto"],
  ["Montreal", "Canada", "North America", 45.5017, -73.5673, "CAD", "America/Toronto"],
  ["Mexico City", "Mexico", "North America", 19.4326, -99.1332, "MXN", "America/Mexico_City"],
  ["Cancun", "Mexico", "North America", 21.1619, -86.8515, "MXN", "America/Cancun"],
  ["San Jose", "Costa Rica", "North America", 9.9281, -84.0907, "CRC", "America/Costa_Rica"],
  ["Havana", "Cuba", "North America", 23.1136, -82.3666, "CUP", "America/Havana"],
  ["Panama City", "Panama", "North America", 8.9824, -79.5199, "PAB", "America/Panama"],
  ["Rio de Janeiro", "Brazil", "South America", -22.9068, -43.1729, "BRL", "America/Sao_Paulo"],
  ["Sao Paulo", "Brazil", "South America", -23.5558, -46.6396, "BRL", "America/Sao_Paulo"],
  ["Buenos Aires", "Argentina", "South America", -34.6037, -58.3816, "ARS", "America/Argentina/Buenos_Aires"],
  ["Santiago", "Chile", "South America", -33.4489, -70.6693, "CLP", "America/Santiago"],
  ["Lima", "Peru", "South America", -12.0464, -77.0428, "PEN", "America/Lima"],
  ["Cusco", "Peru", "South America", -13.53195, -71.9675, "PEN", "America/Lima"],
  ["Bogota", "Colombia", "South America", 4.7110, -74.0721, "COP", "America/Bogota"],
  ["Cartagena", "Colombia", "South America", 10.3910, -75.4794, "COP", "America/Bogota"],
  ["Quito", "Ecuador", "South America", -0.1807, -78.4678, "USD", "America/Guayaquil"],
  ["Galapagos", "Ecuador", "South America", -0.9538, -90.9656, "USD", "Pacific/Galapagos"],
  ["Sydney", "Australia", "Oceania", -33.8688, 151.2093, "AUD", "Australia/Sydney"],
  ["Melbourne", "Australia", "Oceania", -37.8136, 144.9631, "AUD", "Australia/Melbourne"],
  ["Brisbane", "Australia", "Oceania", -27.4698, 153.0251, "AUD", "Australia/Brisbane"],
  ["Perth", "Australia", "Oceania", -31.9505, 115.8605, "AUD", "Australia/Perth"],
  ["Auckland", "New Zealand", "Oceania", -36.8509, 174.7645, "NZD", "Pacific/Auckland"],
  ["Queenstown", "New Zealand", "Oceania", -45.0312, 168.6626, "NZD", "Pacific/Auckland"],
  ["Wellington", "New Zealand", "Oceania", -41.2865, 174.7762, "NZD", "Pacific/Auckland"],
  ["Fiji", "Fiji", "Oceania", -17.7134, 178.0650, "FJD", "Pacific/Fiji"],
  ["Bora Bora", "French Polynesia", "Oceania", -16.5004, -151.7415, "XPF", "Pacific/Tahiti"],
  ["Honolulu", "USA", "Oceania", 21.3069, -157.8583, "USD", "Pacific/Honolulu"]
];

const MONTH_BANDS = [
  { best: "Mar-May", peak: "Jun-Aug", off: "Nov-Feb", avoid: "Sep (storms)", duration: 5 },
  { best: "Apr-Jun", peak: "Jul-Aug", off: "Nov-Mar", avoid: "Oct (rain)", duration: 4 },
  { best: "Sep-Nov", peak: "Dec-Jan", off: "May-Aug", avoid: "Feb (heat)", duration: 6 },
  { best: "May-Sep", peak: "Jul-Aug", off: "Nov-Feb", avoid: "Apr (wet)", duration: 7 },
];

function makeDestination(row, idx) {
  const [city, country, region, lat, lon, currency, timezone] = row;
  const activities = ACTIVITY_SETS[idx % ACTIVITY_SETS.length];
  const season = MONTH_BANDS[idx % MONTH_BANDS.length];
  const popularity = 60 + (idx % 40);
  const budget = 45 + ((idx * 7) % 130);

  return {
    id: idx + 1,
    city,
    country,
    region,
    lat,
    lon,
    currency,
    timezone,
    activities,
    popularity,
    budget,
    bestMonths: season.best,
    peakSeason: season.peak,
    offSeason: season.off,
    avoidMonths: season.avoid,
    recommendedDays: season.duration,
    mustSee: [
      `${city} Old Quarter`,
      `${city} Iconic Viewpoint`,
      `${country} National Museum`,
    ],
    mustDo: [
      `Guided ${activities[0]} experience`,
      `Local ${activities[1]} day plan`,
      `Sunset ${activities[2]} tour`,
    ],
    mustEat: [
      `Signature ${country} street food`,
      `Regional tasting menu in ${city}`,
      `Top-rated local dessert`,
    ],
    image: `https://source.unsplash.com/featured/1200x800/?${encodeURIComponent(city + ' travel landscape')}`,
    video: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(city + ' travel guide 4k')}`,
  };
}

const DESTINATIONS = DESTINATIONS_RAW.map(makeDestination);

function similarFor(destination) {
  return DESTINATIONS
    .filter((d) => d.city !== destination.city)
    .map((candidate) => {
      const shared = candidate.activities.filter((a) => destination.activities.includes(a)).length;
      const regionalBoost = candidate.region === destination.region ? 2 : 0;
      return { city: candidate.city, score: shared + regionalBoost };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.city);
}

DESTINATIONS.forEach((d) => {
  d.similar = similarFor(d);
  d.itineraries = {
    3: [
      `Day 1: ${d.mustSee[0]}, market walk, and ${d.mustEat[0]}`,
      `Day 2: ${d.mustDo[0]} + ${d.mustSee[1]}`,
      `Day 3: ${d.mustDo[2]} and farewell food tour`,
    ],
    5: [
      `Day 1: Arrival + ${d.mustSee[0]}`,
      `Day 2: ${d.mustDo[0]}`,
      `Day 3: Cultural deep-dive + ${d.mustEat[1]}`,
      `Day 4: Day trip and photography spots`,
      `Day 5: Free exploration + shopping`,
    ],
    7: [
      `Day 1: Arrival, orientation walk, local dinner`,
      `Day 2: ${d.mustSee[0]} and ${d.mustSee[2]}`,
      `Day 3: ${d.mustDo[0]}`,
      `Day 4: Nature/adventure day`,
      `Day 5: Neighborhood hopping + ${d.mustEat[1]}`,
      `Day 6: Slow day + hidden gems`,
      `Day 7: ${d.mustDo[2]} + departure`,
    ],
  };
});
