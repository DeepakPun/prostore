export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div className='flex-center min-h-screen w-full'>{children}</div>
}

// If we want to show header on login and signup screens
// import Header from '@/components/shared/header'
{
	/* <div className='flex flex-col min-h-screen w-full'>
	<Header />
	<div className='flex flex-row justify-center items-center mt-4'>
		{children}
	</div>
</div> */
}
