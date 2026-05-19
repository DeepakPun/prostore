import Footer from "@/components/Footer"
import Header from "@/components/shared/header"
import ModeToggle from "@/components/shared/header/mode-toggle"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">
        {children}
      </main>
      <Footer />
    </div>
  )
}
