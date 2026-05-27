import { Button } from "@/components/ui/button"
import ModeToggle from "./mode-toggle"
import Link from "next/link"
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react"
import { Sheet as SheetRoot, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import UserButton from "./user-button"

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* Desktop Navigation Viewport */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* Mobile Responsive Navigation Viewport */}
      <nav className="md:hidden">
        {/* Wrap using the context-safe SheetRoot component wrapper */}
        <SheetRoot>
          <SheetTrigger asChild className="align-middle cursor-pointer">
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation drawer menu options
            </SheetDescription>

            <ModeToggle />

            <Button asChild variant='ghost' className="w-full justify-start">
              <Link href='/cart'>
                <ShoppingCart className="mr-2 h-4 w-4" /> Cart
              </Link>
            </Button>

            <UserButton />
          </SheetContent>
        </SheetRoot>
      </nav>
    </div>
  )
}

export default Menu
