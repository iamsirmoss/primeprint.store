import { prisma } from "@/lib/prisma"
import FooterCompo from "./FooterCompo"


const Footer = async () => {

      const services = await prisma.service.findMany({
            take: 5,
            orderBy: {
                  position: "asc"
            },
            select: {
                  id: true,
                  slug: true,
                  title: true,
            }
      })

      const products = await prisma.product.findMany({
            take: 5,
            select: {
                  id: true,
                  slug: true,
                  title: true,
            } 
      })

  return (
      <div>
            <FooterCompo services={services} products={products} />
      </div>
  )
}

export default Footer
