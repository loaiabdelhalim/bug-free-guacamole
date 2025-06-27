export type MenuItem = {
  label: string
  onClick: () => void
}
export type Item = {
  id: number
  name: string
  prependIcon?: React.ReactNode
  appendIcon?: React.ReactNode
  appendIconMenuItems?: MenuItem[]
}
