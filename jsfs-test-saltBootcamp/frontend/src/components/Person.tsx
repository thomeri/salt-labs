import { FC } from 'react'
import { Role, Salty } from '../interfaces'

type PersonProps = {
  salty: Salty
}

const Person: FC<PersonProps> = ({
  salty
}) => {
  return (
    <article className={`bootcamp-list__person--${salty.role} rounded-md shadow-sm bg-white p-4 text-slate-900`}>
      <h3>{salty.name}</h3>
      {
        salty.role === Role.DEVELOPER && <button className='text-white'>Delete</button>
      }
    </article>
  )
}

export default Person