
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}
 //this way no need to create multiple clients in every single reloads 
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalThis.prisma = db