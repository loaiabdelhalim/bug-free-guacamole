import React, { useState } from 'react'
import Button from './Button'
import PageInput from './PageInput/PageInput'
import { ReactSortable } from 'react-sortablejs'
import { PlusIcon } from '@heroicons/react/24/solid'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { DocumentIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Item } from '../types'
import './App.css'

function App() {
  const [addPageClicked, setAddPageClicked] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [clickedId, setClickedId] = useState<number | null>(null)
  const [newItemName, setNewItemName] = useState('')
  const [state, setState] = useState<Item[]>([
    {
      id: 1,
      name: 'Info',
      appendIcon: <EllipsisVerticalIcon className="size-5" />,
      prependIcon: <ExclamationCircleIcon className="size-5" />,
      appendIconMenuItems: [
        { label: 'Edit', onClick: () => console.log('Edit clicked') },
        { label: 'Delete', onClick: () => console.log('Delete clicked') },
        { label: 'Duplicate', onClick: () => console.log('Duplicate clicked') }
      ]
    },
    {
      id: 2,
      name: 'Details',
      prependIcon: <DocumentIcon className="size-5" />
    },
    { id: 3, name: 'Other', prependIcon: <DocumentIcon className="size-5" /> },
    {
      id: 4,
      name: 'Ending',
      prependIcon: <CheckCircleIcon className="size-5" />
    }
  ])
  const handleAddItem = () => {
    if (newItemName.trim() === '') return

    const newItem = {
      id: state.length + 1,
      name: newItemName
    }

    const index = state.findIndex((item) => item.id === clickedId)

    if (index !== -1) {
      newItem.id = state[index].id + 1
      const updatedState = state.map((item) =>
        item.id > state[index].id ? { ...item, id: item.id + 1 } : item
      )
      updatedState.splice(index + 1, 0, newItem)
      setState(updatedState)
    } else {
      setState((prevState) => [...prevState, newItem])
    }

    setNewItemName('')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddItem()
    }
    // Close the input on Escape or Enter
    if (event.key === 'Escape' || event.key === 'Enter') {
      setClickedId(null)
      setAddPageClicked(false)
    }
  }

  const handlePlusIconClick = (id: number) => {
    setClickedId(id)
    setNewItemName('')
    setAddPageClicked(false)
  }

  const handleAddPageClick = () => {
    setAddPageClicked(true)
    setClickedId(null)
    setNewItemName('')
  }

  return (
    <div className="flex flex-rows items-center justify-center h-screen bg-gray-100 p-4 relative">
      <ReactSortable list={state} setList={setState} animation={200}>
        {state.map((item) => (
          <div
            key={item.id}
            className="float-left flex items-center m-1 relative z-10"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {hoveredId === item.id && (
              <div className="absolute -right-1 bg-white border border-gray-300 rounded-full cursor-pointer">
                {clickedId !== item.id && (
                  <div
                    onClick={() => handlePlusIconClick(item.id)}
                    className="p-1"
                  >
                    <PlusIcon className="size-3" />
                  </div>
                )}
              </div>
            )}
            <Button
              prependIcon={item.prependIcon}
              key={item.id}
              label={item.name}
              appendIcon={item.appendIcon}
              appendIconMenuItems={item.appendIconMenuItems}
            ></Button>
            {clickedId === item.id && (
              <PageInput
                itemName={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyUp={handleKeyPress}
                onClose={() => setClickedId(null)}
              />
            )}
          </div>
        ))}
      </ReactSortable>
      {addPageClicked && (
        <PageInput
          itemName={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyUp={handleKeyPress}
          onClose={() => setAddPageClicked(false)}
        />
      )}
      <div className="pl-2 z-10">
        <Button onClick={handleAddPageClick} label="Add Page" />
      </div>
      <div className="has-dotted-line"></div>
    </div>
  )
}

export default App
