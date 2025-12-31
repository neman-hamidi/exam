import React from 'react'
import Image from 'next/image'
export default function loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <Image src="/images/loading.gif" width={64} height={64} alt="loading-pages" unoptimized/>
    </div>
  )
}