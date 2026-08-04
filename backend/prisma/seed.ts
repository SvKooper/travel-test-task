import { prisma } from '../src/db/prisma.js'

const services = [
  { icon: 'plane', title: 'Допомога в купівлі авіаквитків для кліентів не з України', order: 0 },
  { icon: 'hiking', title: 'Планування піших маршрутів', order: 1 },
  { icon: 'bike', title: 'Оренда велосипедів і планування маршрутів', order: 2 },
  { icon: 'car', title: 'Ми не займаємось джипінгом, бо це ницо', order: 3 },
  { icon: 'boat', title: 'Яхт-тури Ужем і Тисою', order: 4 },
]

const faq = [
  {
    question: 'Говерла здіймається над Карпатами, збираючи мандрівників, що прагнуть підкорити її вершину і відчути свободу.',
    answer: 'Колись ця полонина була важливим пасовищем для овець та великої рогатої худоби, а її назва походить від слова «руно» - густе овече хутро.',
    order: 0,
  },
  {
    question: 'На Піп Івані мовчазні руїни обсерваторії розповідають історії минулого крізь вітри й хмари часу.',
    answer: 'Колись ця полонина була важливим пасовищем для овець та великої рогатої худоби, а її назва походить від слова «руно» - густе овече хутро.',
    order: 1,
  },
  {
    question: 'Петрос – це виклик, пригоди та сила природи, що відчувається кожним кроком на його схилах і вершинах.',
    answer: 'Колись ця полонина була важливим пасовищем для овець та великої рогатої худоби, а її назва походить від слова «руно» - густе овече хутро.',
    order: 2,
  },
  {
    question: 'Ай-Петрі здіймається над Кримом, розливаючи перед очима безмежні простори моря, гір і неба в єдності.',
    answer: 'Колись ця полонина була важливим пасовищем для овець та великої рогатої худоби, а її назва походить від слова «руно» - густе овече хутро.',
    order: 3,
  },
  {
    question: 'Озеро Бребенескул, оточене гірськими хребтами, ховає у своїх водах відображення зірок та спокій вітрів.',
    answer: 'Колись ця полонина була важливим пасовищем для овець та великої рогатої худоби, а її назва походить від слова «руно» - густе овече хутро.',
    order: 4,
  },
]

async function main() {
  // Reseeding is meant to reset to this fixed list, not append to it — clear first so
  // re-running the script (e.g. after editing placeholder copy) doesn't duplicate rows.
  await prisma.serviceItem.deleteMany()
  await prisma.faqItem.deleteMany()

  for (const service of services) {
    await prisma.serviceItem.create({ data: service })
  }

  for (const item of faq) {
    await prisma.faqItem.create({ data: item })
  }

  await prisma.siteContent.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, heroTitle: 'Мааааам, я\nв Карпати' },
  })
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
