import React, { FC } from 'react'
import { Bootcamp, Salty } from '../interfaces'
import BootcampComponent from './Bootcamp';

type GalleryProps = {
  salties: Salty[];
}

const Gallery: FC<GalleryProps> = (props) => {
  const bootcamps = Object.values(Bootcamp);
  return (
    <section className="gallery flex flex-col gap-4">
      <h2>Gallery</h2>
      {
        bootcamps.map(bootcampName => {
          return <BootcampComponent salties={props.salties.filter((salty) => {
            return salty.bootcamp === bootcampName;
          })} bootcampName={bootcampName} />
        })
      }
    </section>
  )
}

export default Gallery