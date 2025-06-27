import React, { useState } from 'react'

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Add Page
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-1/3 transform transition-transform duration-300 ${
              isOpen ? 'scale-100' : 'scale-90'
            } ease-out`}
          >
            <h2 className="text-xl font-bold mb-4">Popup Title</h2>
            <p className="mb-4">
              This is a simple popup modal using Tailwind CSS with a transition
              effect.
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopupModal
