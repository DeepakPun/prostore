'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpUser } from "@/lib/actions/user.actions"
import { signUpDefaultValues } from "@/lib/constants"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: ''
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const SignUpButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button disabled={pending} className="w-full" variant='default'>
        {pending ? "Registering ..." : 'Sign Up'}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {/* Brad's version */}
        {/* {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )} */}

        {/* styled version */}
        {data && !data.success && typeof data.message === 'string' && data.message.trim().length > 0 && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
            <p className="mb-2 text-left font-semibold">Please correct the following errors:</p>
            <ul className="space-y-1.5 text-left text-destructive/90">
              {data.message
                .split('.')
                .map((msg: string): string => msg.trim())
                .filter((msg: string): boolean => msg.length > 0)
                .sort((a: string, b: string): number => a.localeCompare(b))
                .map((errorText: string, index: number) => (
                  <li key={index} className="flex items-start gap-1.5 leading-normal">
                    <ArrowRight className="h-4 w-4 shrink-0 mt-0.5 text-destructive/70" />
                    <span>{errorText}.</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account? {' '}
          <Link href='/sign-in' target="_self" className="link">Sign In</Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm