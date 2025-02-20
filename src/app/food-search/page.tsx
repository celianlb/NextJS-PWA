"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Product {
  id: string
  product_name: string
  brands: string
  image_url: string
}

export default function FoodSearch() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOffline(!navigator.onLine)

    fetchInitialProducts()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const fetchInitialProducts = async () => {
    try {
      const response = await fetch(
        "https://world.openfoodfacts.org/cgi/search.pl?action=process&sort_by=unique_scans_n&page_size=100&json=1",
      )
      const data = await response.json()
      const products = data.products.map((product: any) => ({
        id: product.id,
        product_name: product.product_name,
        brands: product.brands,
        image_url: product.image_url,
      }))
      setAllProducts(products)
      setDisplayedProducts(products)
    } catch (error) {
      console.error("Error fetching initial products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const searchFood = () => {
    if (!query) {
      setDisplayedProducts(allProducts)
      return
    }
    const filteredProducts = allProducts.filter(
      (product) =>
        product.product_name.toLowerCase().includes(query.toLowerCase()) ||
        product.brands.toLowerCase().includes(query.toLowerCase()),
    )
    setDisplayedProducts(filteredProducts)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Search</h1>
      {isOffline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p>You are currently offline. Some features may be limited.</p>
        </div>
      )}
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search within products"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={searchFood}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <p className="mb-4">Showing {displayedProducts.length} products</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-md hover:shadow-md transition-shadow">
                <Link href={`/food-details/${product.id}`}>
                  <div className="aspect-w-1 aspect-h-1 mb-2">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.product_name}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-blue-500 hover:underline">{product.product_name}</h2>
                </Link>
                <p className="text-gray-600">{product.brands}</p>
              </div>
            ))}
          </div>
        </>
      )}
      <Link href="/" className="mt-8 inline-block text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  )
}

