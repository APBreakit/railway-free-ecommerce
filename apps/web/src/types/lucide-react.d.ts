declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react'
  
  export interface LucideProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
    size?: string | number
    absoluteStrokeWidth?: boolean
  }
  
  export type LucideIcon = ComponentType<LucideProps>
  
  export const Search: LucideIcon
  export const ShoppingCart: LucideIcon
  export const User: LucideIcon
  export const Menu: LucideIcon
  export const X: LucideIcon
  export const Heart: LucideIcon
  export const Star: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronUp: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const Plus: LucideIcon
  export const Minus: LucideIcon
  
  // Dodaj więcej ikon według potrzeb
  const lucide: {
    [key: string]: LucideIcon
  }
  
  export default lucide
}