import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center bg-gradient-to-b rounded-sm text-sm font-medium border transition-colors shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "from-primary/60 to-primary text-primary-foreground hover:bg-zinc-600/80 border-red-600",
        secondary: "from-secondary/60 to-secondary text-secondary-foreground hover:bg-zinc-500/80 border-blue-600",
        destructive: "from-destructive/60 to-destructive text-destructive-foreground hover:bg-zinc-500/80 border-red-600",
        outline: "from-background/60 to-zinc-100 border-input hover:bg-zinc-500/30 hover:text-accent-foreground",
        ghost: "border-0 shadow-none hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}>
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 stroke-1 animate-spin' /> : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }