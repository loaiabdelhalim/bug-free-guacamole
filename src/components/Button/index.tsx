import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

type MenuItem = { label: string; onClick: () => void }
type ButtonProps = {
  label?: string
  prependIcon?: React.ReactNode
  appendIcon?: React.ReactNode
  onClick?: () => void
  appendIconMenuItems?: MenuItem[]
}

export default function Button({
  label = 'Click Me',
  prependIcon,
  appendIcon,
  onClick,
  appendIconMenuItems = []
}: ButtonProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(menuRef, () => setOpen(false))

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (appendIconMenuItems.length) setOpen((o) => !o)
  }

  return (
    <button
      onClick={onClick}
      className="m-1 mr-7 flex items-center rounded px-3 py-2
                 bg-[#9DA4B2]/15 text-[#677289] transition-colors
                 hover:bg-[#9DA4B2]/35 focus:bg-white focus:text-[#1A1A1A]
                 focus:ring-1 focus:ring-[#2F72E2] focus:shadow-[0_0_0_1px_#2F72E2] z-100"
    >
      {prependIcon && <span className="mr-2">{prependIcon}</span>}
      {label}
      {appendIcon && (
        <span onClick={toggleMenu} className="ml-2">
          {appendIcon}
        </span>
      )}
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 bottom-11 w-32 rounded bg-white shadow-lg"
        >
          {appendIconMenuItems.map(({ label, onClick }, i) => (
            <span
              key={i}
              onClick={onClick}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}
