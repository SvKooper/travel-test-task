import { prisma } from '../src/db/prisma.js'

const services = [
  { icon: 'plane', title: 'Допомога в купівлі авіаквитків для кліентів не з України', order: 0 },
  { icon: 'hiking', title: 'Планування піших маршрутів', order: 1 },
  { icon: 'bike', title: 'Оренда велосипедів і планування маршрутів', order: 2 },
  { icon: 'car', title: 'Ми не займаємось джипінгом, бо це ницо', order: 3 },
  { icon: 'boat', title: 'Яхт-тури Ужем і Тисою', order: 4 },
]

async function main() {
  // Reseeding is meant to reset to this fixed list, not append to it — clear first so
  // re-running the script (e.g. after editing placeholder copy) doesn't duplicate rows.
  await prisma.serviceItem.deleteMany()

  for (const service of services) {
    await prisma.serviceItem.create({ data: service })
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
