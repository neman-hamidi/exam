import React from 'react'
import "./utilitiItem.css"

export default function utilitiitem({ title, desc }) {
  return (
    <div className='py-4 px-6 bg-gray-100 border border-yellow-300 rounded-lg slm'>
        <p className='text-center text-base md:text-2xl text-blue-600 font-bold mb-4 mt-4'>{title}</p>
        <p className='leading-8 text-gray-500 md:w-[544px] w-fit text-xs text-justify'>{desc}</p>
    </div>
  )
}
