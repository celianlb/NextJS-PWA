import Link from "next/link"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">About My PWA NextJS</h1>
      <p className="mb-8">This is a Progressive Web App built with Next.js and TypeScript.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  )
}

