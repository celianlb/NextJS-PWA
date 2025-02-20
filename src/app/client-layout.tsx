"use client"

import type React from "react"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
}

