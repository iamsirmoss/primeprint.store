import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='container'>
      <Button><Link href={'/connexion'}>Retour à la page de connexion</Link></Button>
    </div>
  )
}

export default page