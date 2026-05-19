import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prismaBase = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismaBase

export const prisma = prismaBase.$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute(product) {
          return product.price.toString()
        },
      },
      rating: {
        needs: { rating: true },
        compute(product) {
          return product.rating.toString()
        },
      },
    },
  },
})
