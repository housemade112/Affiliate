// affiliates.js

const firstNames = [
  'James','Michael','William','David','Robert','John','Richard','Thomas',
  'Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul',
  'Andrew','Joshua','Kenneth','Kevin','Brian','George','Timothy','Ronald',
  'Jason','Edward','Jeffrey','Ryan','Jacob','Gary','Nicholas','Eric',
  'Jonathan','Stephen','Larry','Justin','Scott','Brandon','Benjamin','Samuel',
  'Gregory','Alexander','Frank','Patrick','Raymond','Jack','Dennis','Jerry',
  'Tyler','Aaron','Jose','Adam','Nathan','Henry','Douglas','Zachary','Peter',
  'Mary','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan',
  'Margaret','Dorothy','Lisa','Nancy','Karen','Betty','Helen','Sandra','Donna',
  'Carol','Ruth','Sharon','Michelle','Laura','Sarah','Kimberly','Deborah','Jessica',
  'Shirley','Cynthia','Angela','Melissa','Brenda','Amy','Anna','Rebecca','Virginia',
  'Kathleen','Pamela','Martha','Debra','Amanda','Stephanie','Carolyn','Christine','Marie',
  'Janet','Catherine','Frances','Ann','Joyce','Diane','Alice','Julie','Heather','Teresa'
]

const lastNames = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
  'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin',
  'Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson',
  'Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores',
  'Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts',
  'Gomez','Phillips','Evans','Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes'
]

const niches = [
  'Finance & Options', 'E-Commerce Arbitrage', 'Real Estate Wholesaling',
  'Digital Wellness', 'B2B SaaS Subscriptions', 'Fitness Coaching',
  'Web3 & Crypto', 'High-Ticket Sales', 'Personal Brand Monetization'
]

// Simple seeded PRNG
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
const seedRandom = mulberry32(12345);

const generatedAffiliates = []
const usedNames = new Set()

// Generate 120 authentic-looking affiliates
for (let i = 1; i <= 120; i++) {
  let fName, lName, fullName;
  do {
    fName = firstNames[Math.floor(seedRandom() * firstNames.length)]
    lName = lastNames[Math.floor(seedRandom() * lastNames.length)]
    fullName = `${fName} ${lName}`
  } while (usedNames.has(fullName))
  usedNames.add(fullName)
  
  // Use DiceBear for illustrated avatars
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=b6e3f4,c0aede,d1d4f9`

  const niche = niches[Math.floor(seedRandom() * niches.length)]
  
  // Exponentially scale revenues to make it look like a real distribution
  const revenueBase = Math.floor(seedRandom() * 100) + 10
  const multiplier = seedRandom() > 0.9 ? 100000 : (seedRandom() > 0.7 ? 10000 : 1000)
  const revenue = revenueBase * multiplier
  
  const monthlyReturn = (seedRandom() * 30 + 5).toFixed(1) // 5.0 to 35.0
  const followers = Math.floor(seedRandom() * 500) + 10 // 10k to 510k
  const followersStr = `${followers}K`
  
  const rating = (seedRandom() * 1 + 4).toFixed(1) // 4.0 to 5.0
  
  let minDeposit = 500
  if (revenue > 2000000) minDeposit = 2500
  else if (revenue > 500000) minDeposit = 1000

  // Standardize 3 products per affiliate
  const products = [
    { name: `Advanced ${niche} Masterclass`, price: 997, type: 'Course' },
    { name: '1-on-1 Strategy Call', price: 497, type: 'Consulting' },
    { name: 'Private Discord Community', price: 97, type: 'Subscription' }
  ]

  generatedAffiliates.push({
    id: `aff_${i}`,
    name: fullName,
    avatar: avatarUrl,
    niche: niche,
    revenue: revenue, // raw number for sorting
    monthlyReturn: parseFloat(monthlyReturn), // percentage
    followers: followersStr,
    rating: parseFloat(rating),
    minDeposit: minDeposit,
    products: products
  })
}

// Ensure the array is sorted by revenue descending for the default leaderboard view
generatedAffiliates.sort((a, b) => b.revenue - a.revenue)

export function getAllAffiliates() {
  return generatedAffiliates
}

export function getAffiliateById(id) {
  return generatedAffiliates.find(a => a.id === id)
}

// Only used for the Admin panel to simulate editing
export function updateAffiliate(id, updates) {
  const index = generatedAffiliates.findIndex(a => a.id === id)
  if (index !== -1) {
    generatedAffiliates[index] = { ...generatedAffiliates[index], ...updates }
    return true
  }
  return false
}
