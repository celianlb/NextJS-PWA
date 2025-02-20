import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to My PWA NextJS</h1>
      <p className="mt-4 text-xl">This is a Progressive Web App built with Next.js</p>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <Link href="/about" className="text-blue-500 hover:underline">
          Learn More
        </Link>
        <Link href="/food-search" className="text-blue-500 hover:underline">
          Search Food Products
        </Link>
      </div>
    </main>
  )
}

