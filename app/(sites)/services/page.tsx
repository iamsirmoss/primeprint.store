import Banner from '@/components/ServicesPage/Banner'
import Services from '@/components/ServicesPage/Services'
import { prisma } from '@/lib/prisma'

const page = async () => {

  const services = await prisma.service.findMany({
    take: 8,
    orderBy: {
      position: "asc"
    },
    select: {
      id: true,
      slug: true,
      title: true,
      icon: true,
      description: true,
    }
  })

  return (
    <div>
      <Banner />
      <Services services={services} />
    </div>
  )
}

export default page
