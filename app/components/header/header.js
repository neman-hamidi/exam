import React from 'react'
import Image from 'next/image'
export default function header() {
  return (
    <header>
      <div className="">
        <div className="flex flex-col md:flex-row items-center justify-around w-11/12 mx-auto mt-10">
          <div className="">
            <p className="text-xl md:text-4xl text-yellow-500 font-bold text-center ">
              بانک سوال هوشمند  
            </p>
            <p className="text-sm md:text-2xl text-center py-4 text-blue-700 my-5">
              درباره بانک سوال هوشمند بیشتر بدانید
            </p>
            <div className="border-t border-t-gray-950">
              <div className="flex justify-between flex-col p-3 px-5 gap-4 bg-gray-200">
                <div className='flex items-center justify-between gap-x-12'>
                  <p className="font-bold text-sm md:text-lg">کاربر بانک سوال</p>
                  <p className="text-yellow-600 font-bold text-sm">۳۲۰ هزار نفر</p>
                </div>
                <div className='flex items-center justify-between gap-x-12'>
                  <p  className="font-bold text-sm md:text-lg">آزمون و تمرین</p>
                  <p className="text-yellow-600 font-bold text-sm">۳۲۰ هزار نفر</p>
                </div>
                <div className='flex items-center justify-between gap-x-12'>
                  <p  className="font-bold text-sm md:text-lg">مجموع سوال</p>
                  <p className="text-yellow-600 font-bold text-sm">۴۷۰ هزار</p>
                </div>
              </div>
            </div>
              <div className="text-center my-5">
                <button className="bg-yellow-400 rounded-lg p-2 text-sm md:text-xl">بانک سوالات رایگان</button>
              </div>
          </div>
          <div className="">
            <div className="">
              <Image src="/images/math-header.png" width={380} height={380} alt='img-header'/>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
