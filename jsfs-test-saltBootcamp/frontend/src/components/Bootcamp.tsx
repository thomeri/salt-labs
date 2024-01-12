import React, { FC } from 'react'
import { Role, Salty } from '../interfaces';
import Person from './Person';

type BootcampProps = {
  bootcampName: string;
  salties: Salty[]
}

const Bootcamp: FC<BootcampProps> = ({bootcampName, salties}) => {
  return (
    <section className='bg-gray-300 rounded-md mb-10 p-8'>
      <h2 className='mb-10 text-gray-900'>{bootcampName}</h2>
      <ul className='flex flex-col gap-4'>
        {
          salties.filter(salty => salty.role === Role.INSTRUCTOR).map((salty) => {
            return <Person salty={salty} />
          })
        }
        {
          salties.filter(salty => salty.role === Role.DEVELOPER).map((salty) => {
            return <Person salty={salty} />
          })
        }
      </ul>
    </section>
  )
}

export default Bootcamp