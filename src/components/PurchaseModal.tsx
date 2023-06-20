import { useUserContext } from '@/context/userContext'
import React, { useState, useEffect } from 'react'
import { BsFillCartPlusFill } from 'react-icons/bs'
import tw from 'tailwind-styled-components'
import { supabase } from '@/lib/supabaseClient'

interface PurchaseProps {
  $isBuyer: boolean
  $isPurchased: boolean
}
const Modal = tw.div`
    fixed flex justify-center items-center z-5 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full 
  `
const PurchaseModal = ({ id, isBuyer }: { id: number; isBuyer: boolean }) => {
  const { user } = useUserContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPurchased, setIsPurchased] = useState<boolean>(false)
  const Purchase = tw.div<PurchaseProps>`
    ${(p) =>
      p.$isBuyer || p.$isPurchased ? 'text-yellow-500' : 'text-gray-500'}
    cursor-pointer   hover:text-yellow-300
  `
  const onPurchase = async () => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ buyer: user?.email })
        .eq('id', id)
      if (error) throw error
      setIsPurchased(true)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Purchase
        $isBuyer={isBuyer}
        $isPurchased={isPurchased}
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <BsFillCartPlusFill className="w-full h-[20px]" />
      </Purchase>
      {isOpen && (
        <Modal>
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to buy this GPU?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={onPurchase}
                >
                  Yes, I&#39;m sure.
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}{' '}
    </>
  )
}

export default PurchaseModal
