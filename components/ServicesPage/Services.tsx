import ServiceCard from '../CardService';

interface ServiceProps {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  description: string | null;
}

const Services = ({services}: {services: ServiceProps[]}) => {
  return (
      <div className='py-10 md:py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold'>Discover our services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  slug={service.slug}
                  title={service.title}
                  description={service.description || ''}
                  image={service.image || ''}
                />
              ))}
            </div>
      </div>
  )
}

export default Services
