import { auth } from '@/auth'
import { getMyCart } from '@/lib/actions/cart.actions'
import { getUserById } from '@/lib/actions/user.actions'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ShippingAddressForm from './shipping-address-form'
import { ShippingAddress } from '@/types'
import CheckoutSteps from '@/components/shared/checkout-steps'

export const metadata: Metadata = {
	title: 'Shipping Address',
}

const ShippingAddressPage = async () => {
	const cart = await getMyCart()

	if (!cart || cart.items.length === 0) redirect('/cart')

	const session = await auth()

	const userId = session?.user?.id

	if (!userId) throw new Error('No user id')

	const user = await getUserById(userId)
	console.log(user)

	return (
		<>
			<CheckoutSteps current={1} />
			<ShippingAddressForm address={user.address as ShippingAddress} />
		</>
	)
}

export default ShippingAddressPage
