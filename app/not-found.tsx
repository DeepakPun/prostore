'use client'

import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/constants"
import Image from "next/image"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md p-6 rounded-xl border bg-card text-card-foreground shadow-sm text-center flex flex-col items-center">

        <Image
          src='/images/logo.svg'
          width={56}
          height={56}
          priority={true}
          alt={`${APP_NAME} logo`}
          className="mb-4"
        />

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          Could not find the requested page resource.
        </p>

        <Button
          variant='outline'
          className="w-full sm:w-auto cursor-pointer"
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>

      </div>
    </div>
  )
}

export default NotFoundPage
