import { Slot } from "@radix-ui/react-slot"
import "./Buttons.css"
import "../../App.css"
import { forwardRef } from "react"

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={`regular depth-shadow ${className ?? ""}`}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

IconButton.displayName = "IconButton"

export default IconButton