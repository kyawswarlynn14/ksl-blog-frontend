import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { RiMenu3Line, RiCloseCircleFill } from "react-icons/ri";
import {CgMenuBoxed} from 'react-icons/cg'
import Link from 'next/link';

export default function NavMobile({categories}) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
        <div>
            <div
            onClick={openModal}
            className="flex items-center md:hidden mr-2"
            >
            <CgMenuBoxed className="text-4xl text-white" />
            </div>
        </div>

        <Dialog open={isOpen} as="div" className="relative z-40 md:hidden" onClose={closeModal}>
            
            <div className="fixed inset-0 bg-black bg-opacity-40" />

            <div className="fixed inset-0 z-40 flex">
                <Dialog.Panel className="relative mr-auto flex h-full w-48 flex-col overflow-y-auto bg-slate-800 py-4 pb-6 shadow-xl rounded-r-lg">

                <div className="flex items-center justify-end px-4" onClick={closeModal}>
                    <RiCloseCircleFill className='text-xl text-white' />
                </div>

                <div className=" flex flex-col my-4 gap-4">
                <Link href='/' className='font-mono bg-white p-2 px-4 rounded-e-xl flex items-center gap-2 ' onClick={closeModal}>
                    Home
                </Link>
                {categories.map((category, index) => (
                    <Link key={index} href={`/category/${category.slug}`}>
                    <span className="font-mono bg-white p-2 px-4 rounded-e-xl flex items-center gap-2 " onClick={closeModal}>
                        {category.name}
                    </span>
                    </Link>
                ))}
                <a href='https://kyawswarlynn.vercel.app' className='font-mono bg-white p-2 px-4 rounded-e-xl flex items-center gap-2 ' onClick={closeModal}>
                    Portfolio
                </a>
                </div>

                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}
