'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { shippingAddressDefaultValues } from '@/lib/constants'
import { shippingAddressSchema } from '@/lib/validators'
import { ShippingAddress } from '@/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'
import { updateUserAddress } from '@/lib/actions/user.actions'

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
	const router = useRouter()
	const { toast } = useToast()

	const form = useForm<z.infer<typeof shippingAddressSchema>>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: address || shippingAddressDefaultValues,
	})

	const [isPending, startTransition] = useTransition()

	const onSubmit: SubmitHandler<
		z.infer<typeof shippingAddressSchema>
	> = async values => {
		startTransition(async () => {
			const res = await updateUserAddress(values)

			if (!res.success) {
				toast({
					variant: 'destructive',
					description: res.message,
				})
				return
			}

			router.push('/payment-method')
		})
	}

	return (
		<>
			<div className='max-w-md mx-auto space-y-4'>
				<h1 className='h2-bold mt-4'>Shipping Address</h1>
				<p className='text-sm text-muted-foreground'>
					Please enter an address to ship to
				</p>
				<Form {...form}>
					<form
						method='POST'
						className='space-y-4'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='fullName'
								render={({
									field,
								}: {
									field: ControllerRenderProps<
										z.infer<typeof shippingAddressSchema>,
										'fullName'
									>
								}) => (
									<FormItem className='w-full'>
										<FormLabel className=''>Full Name</FormLabel>
										<FormControl className=''>
											<Input placeholder='Enter full name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>
							<FormField
								control={form.control}
								name='streetAddress'
								render={({
									field,
								}: {
									field: ControllerRenderProps<
										z.infer<typeof shippingAddressSchema>,
										'streetAddress'
									>
								}) => (
									<FormItem className='w-full'>
										<FormLabel className=''>Street Address</FormLabel>
										<FormControl className=''>
											<Input placeholder='Enter address' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='city'
								render={({
									field,
								}: {
									field: ControllerRenderProps<
										z.infer<typeof shippingAddressSchema>,
										'city'
									>
								}) => (
									<FormItem className='w-full'>
										<FormLabel className=''>City</FormLabel>
										<FormControl className=''>
											<Input placeholder='Enter city' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>
							<FormField
								control={form.control}
								name='postalCode'
								render={({
									field,
								}: {
									field: ControllerRenderProps<
										z.infer<typeof shippingAddressSchema>,
										'postalCode'
									>
								}) => (
									<FormItem className='w-full'>
										<FormLabel className=''>Postal Code</FormLabel>
										<FormControl className=''>
											<Input placeholder='Enter postal code' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>
						</div>
						<div className='flex flex-col md:flex-row gap-5'>
							<FormField
								control={form.control}
								name='country'
								render={({
									field,
								}: {
									field: ControllerRenderProps<
										z.infer<typeof shippingAddressSchema>,
										'country'
									>
								}) => (
									<FormItem className='w-full'>
										<FormLabel className=''>Country</FormLabel>
										<FormControl className=''>
											<Input placeholder='Enter country' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}></FormField>
						</div>
						<div className='flex gap-2'>
							<Button type='submit' disabled={isPending}>
								{isPending ? (
									<Loader className='w-4 h-4 animate-spin' />
								) : (
									<ArrowRight className='w-4 h-4' />
								)}
								Continue
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}

export default ShippingAddressForm