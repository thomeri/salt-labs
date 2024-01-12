import React, { ElementRef, FC, SyntheticEvent, useState } from 'react'
import { Bootcamp, Salty } from '../interfaces';

type AddDeveloperFormProps = {
  addNewDeveloper: (salty: Partial<Salty>) => void
}

const AddDeveloperForm: FC<AddDeveloperFormProps> = ({
  addNewDeveloper
}) => {
  const bootcamps = [{
    label: 'JSFS',
    value: 'jsfs'
  }, {
    label: 'DNFS',
    value: 'dnfs'
  }, {
    label: 'JFS',
    value: 'jfs'
  }];
  const [showError, setShowError] = useState(false);

  const addDevFormSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const inputEl = form.elements.namedItem('devName') as HTMLInputElement;
    const devName = inputEl.value;
    if (!devName) {
      setShowError(true);
      return;
    }
    const selectEl = form.elements.namedItem('devBootcamp') as HTMLSelectElement;
    const devBootcamp = selectEl.value;
    console.log({
      devName,
      devBootcamp
    })
    addNewDeveloper({
      name: devName,
      bootcamp: devBootcamp as Bootcamp
    })
  }
  return (
    <form onSubmit={addDevFormSubmit} id="addDeveloperForm" className='form flex flex-col gap-4'>
      <input name='devName' className='form__input-name px-2 py-1.5 rounded-md' placeholder='Developer Full Name' />
      <select name='devBootcamp' className='px-2 py-1.5 rounded-md'>
        {
          bootcamps.map((bootcamp) => {
            return <option value={bootcamp.value}>{bootcamp.label}</option>
          })
        }
      </select>
      <button className='form__button-addDev'>Submit</button>
      {
        showError && <p className='form__error-message text-red-800'>
        Invalid input
      </p>
      }
    </form>
  )
}

export default AddDeveloperForm