import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Lazy initialization
export const getPrisma = () => {
  if (globalThis.prisma) return globalThis.prisma
  const prisma = prismaClientSingleton()
  if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
  return prisma
}

const prisma = getPrisma()
export default prisma
