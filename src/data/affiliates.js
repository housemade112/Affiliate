const firstNames = [
  'James','Michael','William','David','Robert','John','Richard','Thomas',
  'Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul',
  'Andrew','Joshua','Kenneth','Kevin','Brian','George','Timothy','Ronald',
  'Edward','Jason','Jeffrey','Ryan','Jacob','Gary','Nicholas','Eric',
  'Jonathan','Stephen','Larry','Justin','Scott','Brandon','Benjamin','Samuel',
  'Frank','Gregory','Raymond','Alexander','Patrick','Jack','Dennis','Jerry',
  'Tyler','Aaron','Jose','Adam','Nathan','Henry','Douglas','Zachary',
  'Peter','Kyle','Ethan','Walter','Noah','Jeremy','Christian','Keith',
  'Roger','Terry','Gerald','Harold','Sean','Austin','Carl','Arthur',
  'Lawrence','Dylan','Jesse','Jordan','Bryan','Billy','Joe','Bruce',
  'Gabriel','Logan','Albert','Willie','Alan','Juan','Wayne','Elijah',
  'Randy','Roy','Vincent','Ralph','Eugene','Russell','Bobby','Mason',
  'Philip','Louis','Mary','Patricia','Jennifer','Linda','Elizabeth','Barbara',
  'Susan','Jessica','Sarah','Karen','Nancy','Lisa','Betty','Margaret',
  'Sandra','Ashley','Kimberly','Emily','Donna','Michelle','Dorothy','Carol',
  'Amanda','Melissa','Deborah','Stephanie','Rebecca','Laura','Sharon','Cynthia',
  'Kathleen','Amy','Shirley','Angela','Helen','Anna','Brenda','Pamela',
  'Nicole','Emma','Samantha','Katherine','Christine','Debra','Rachel','Catherine',
  'Carolyn','Janet','Ruth','Maria','Heather','Diane','Virginia','Julie',
  'Joyce','Victoria','Olivia','Kelly','Christina','Lauren','Joan','Evelyn',
  'Judith','Megan','Cheryl','Andrea','Hannah','Martha','Jacqueline','Frances',
  'Gloria','Ann','Teresa','Kathryn','Sara','Janice','Jean','Alice',
  'Madison','Doris','Abigail','Julia','Judy','Grace','Denise','Amber',
  'Marilyn','Beverly','Danielle','Theresa','Sophia','Marie','Diana','Brittany',
  'Natalie','Isabella','Charlotte','Rose','Alexis','Kayla'
]

const lastNames = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis',
  'Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson',
  'Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson',
  'White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker',
  'Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores',
  'Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell',
  'Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz','Parker',
  'Cruz','Edwards','Collins','Reyes','Stewart','Morris','Morales','Murphy',
  'Cook','Rogers','Gutierrez','Ortiz','Morgan','Cooper','Peterson','Bailey',
  'Reed','Kelly','Howard','Ramos','Kim','Cox','Ward','Richardson','Watson',
  'Brooks','Chavez','Wood','James','Bennett','Gray','Mendoza','Ruiz','Hughes',
  'Price','Alvarez','Castillo','Sanders','Patel','Myers','Long','Ross',
  'Foster','Jimenez','Powell','Jenkins','Perry','Russell','Sullivan','Bell',
  'Coleman','Butler','Henderson','Barnes','Gonzales','Fisher','Vasquez','Simpson',
  'Romero','Jordan','Patterson','Alexander','Hamilton','Graham','Reynolds','Griffin',
  'Wallace','Moreno','West','Cole','Hayes','Bryant','Herrera','Gibson','Ellis',
  'Tran','Medina','Aguilar','Stevens','Murray','Ford','Castro','Marshall',
  'Owens','Harrison','Fernandez','Woods','Washington','Kennedy','Wells','Vargas',
  'Henry','Chen','Freeman','Webb','Tucker','Guzman','Burns','Crawford','Olson',
  'Simpson','Porter','Hunter','Gordon','Mendez','Silva','Shaw','Snyder','Mason',
  'Dixon','Munoz','Hunt','Hicks','Holmes','Palmer','Wagner','Black','Robertson',
  'Boyd','Rose','Stone','Salazar','Fox','Warren','Mills','Meyer','Rice','Schmidt',
  'Garza','Daniels','Ferguson','Nichols','Stephens','Soto','Weaver','Ryan','Gardner',
  'Payne','Grant','Dunn','Kelley','Spencer','Hawkins','Arnold','Pierce','Vazquez',
  'Hansen','Peters','Santos','Hart','Bradley','Knight','Elliott','Cunningham','Duncan'
]

const niches = [
  'Crypto Day Trading','Forex Scalping','Swing Trading','Options Strategies',
  'Dividend Investing','Growth Stocks','Value Investing','Penny Stocks',
  'Commodities','Index Funds','Technical Analysis','Algorithmic Trading',
  'Social Trading','Copy Trading','Portfolio Management','Risk Management',
  'Arbitrage','Futures Trading','Bond Trading','REITs','NFT Flipping',
  'DeFi Yield Farming','Staking Strategies','Metaverse Assets','AI Trading Bots'
]

const avatarColors = [
  'bg-indigo-500','bg-emerald-500','bg-amber-500','bg-rose-500',
  'bg-cyan-500','bg-violet-500','bg-fuchsia-500','bg-lime-500',
  'bg-sky-500','bg-orange-500','bg-teal-500','bg-pink-500'
]

function generateGrowthArray() {
  const base = 100
  const data = [base]
  for (let i = 1; i < 12; i++) {
    const change = (Math.random() - 0.3) * 25
    data.push(Math.max(data[i - 1] + change, 50))
  }
  return data.map(v => Math.round(v * 10) / 10)
}

function generateAffiliate(index) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const niche = niches[Math.floor(Math.random() * niches.length)]
  const revenue = Math.floor(200000 + Math.random() * 4800000)
  const rating = Math.round((3.0 + Math.random() * 2.0) * 10) / 10
  const minDeposit = Math.floor(2 + Math.random() * 8) * 100
  const followers = Math.floor(1000 + Math.random() * 499000)
  const winRate = Math.floor(55 + Math.random() * 35)
  const totalTrades = Math.floor(500 + Math.random() * 9500)
  const profitFactor = Math.round((1.2 + Math.random() * 2.3) * 100) / 100
  const sharpeRatio = Math.round((0.8 + Math.random() * 2.5) * 100) / 100
  const maxDrawdown = Math.round((5 + Math.random() * 25) * 10) / 10
  const monthlyReturn = Math.round((2 + Math.random() * 18) * 10) / 10
  const yearsExperience = Math.floor(2 + Math.random() * 13)
  const verified = Math.random() > 0.3
  const premium = Math.random() > 0.7
  const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)]

  return {
    id: `aff-${index + 1}`,
    name: `${firstName} ${lastName}`,
    niche,
    revenue,
    rating,
    minDeposit,
    followers,
    winRate,
    totalTrades,
    profitFactor,
    sharpeRatio,
    maxDrawdown,
    monthlyReturn,
    yearsExperience,
    verified,
    premium,
    avatarColor,
    growth: generateGrowthArray(),
    bio: `Professional ${niche.toLowerCase()} specialist with ${yearsExperience}+ years of market experience. Consistent performer with a ${winRate}% win rate across ${totalTrades.toLocaleString()} trades.`,
    strategy: `Primary approach combines ${niche.toLowerCase()} with advanced technical indicators. Entry signals generated through multi-timeframe analysis. Risk per trade capped at 2% of portfolio.`,
    location: ['New York, USA','London, UK','Singapore','Dubai, UAE','Zurich, Switzerland','Hong Kong','Sydney, Australia','Toronto, Canada'][Math.floor(Math.random() * 8)],
    joinedDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString(),
  }
}

const affiliates = Array.from({ length: 120 }, (_, i) => generateAffiliate(i))

export default affiliates

export const getAffiliateById = (id) => {
  const edits = JSON.parse(localStorage.getItem('ct_affiliateEdits') || '{}')
  const base = affiliates.find(a => a.id === id)
  if (!base) return null
  return { ...base, ...(edits[id] || {}) }
}

export const getAllAffiliates = () => {
  const edits = JSON.parse(localStorage.getItem('ct_affiliateEdits') || '{}')
  return affiliates.map(a => ({ ...a, ...(edits[a.id] || {}) }))
}

export const updateAffiliate = (id, updates) => {
  const edits = JSON.parse(localStorage.getItem('ct_affiliateEdits') || '{}')
  edits[id] = { ...(edits[id] || {}), ...updates }
  localStorage.setItem('ct_affiliateEdits', JSON.stringify(edits))
  return true
}

export const getTopAffiliates = (limit = 10) => {
  return getAllAffiliates().sort((a, b) => b.revenue - a.revenue).slice(0, limit)
}
