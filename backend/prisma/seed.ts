import { prisma } from '../src/db/prisma.js'
import { seedDefaults } from '../src/db/seed.js'

seedDefaults()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
