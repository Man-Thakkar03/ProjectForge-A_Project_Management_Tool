import React, { useState } from 'react'
import Title from '../components/Title'

const Users = () => {
  const [openDialog ,  setOpenDialog] = useState(false);
  const [open , setOpen] = useState(false);
  const [openAction , setopenAction] = useState(false);
  const [selected , setSelected] = useState(null);


  return (
    <div className='w-full md:px-1 px-0 mb-6'>
      <div className='flex items-center justify-between mb-8 '>
        <Title title =  'Team Members'/>
         
      </div>
      
    </div>
  )
}

export default Users 
