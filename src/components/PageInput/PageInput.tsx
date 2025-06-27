import { ArrowTurnDownLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

type PageInputProps = {
  itemName: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onClose?: () => void
}
export default function PageInput(props: PageInputProps) {
  return (
    <div className="relative z-10">
      <input
        className="py-2 left-0 border border-gray-300 rounded mr-4 pl-3"
        type="text"
        value={props.itemName}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        placeholder="Enter new item"
        autoFocus
      />
      <div className="absolute inset-y-0 right-4 flex items-center pr-3 pointer-events-none">
        <ArrowTurnDownLeftIcon className="h-5 w-5 text-gray-400" />
      </div>
      <div
        onClick={props.onClose}
        className="absolute -right-4 inset-y-0 flex items-center pr-3 p-0 cursor-pointer"
      >
        <XMarkIcon className="size-5" />
      </div>
    </div>
  )
}
