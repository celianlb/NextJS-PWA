"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FoodDetails() {
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
        const data = await response.json()
        if (data.status === 1) {
          setProduct(data.product)
        } else {
          setError("Product not found")
        }
      } catch (err) {
        setError("Failed to fetch product details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product?.product_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={product?.image_url || "/placeholder.svg"}
            alt={product?.product_name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <p>
            <strong>Brand:</strong> {product?.brands}
          </p>
          <p>
            <strong>Categories:</strong> {product?.categories}
          </p>
          <p>
            <strong>Ingredients:</strong> {product?.ingredients_text}
          </p>
          <p>
            <strong>Nutrition Grade:</strong> {product?.nutrition_grades?.toUpperCase()}
          </p>
          <p>
            <strong>Allergens:</strong> {product?.allergens || "None listed"}
          </p>
        </div>
      </div>
      <Link href="/food-search" className="mt-8 inline-block text-blue-500 hover:underline">
        Back to Search
      </Link>
    </div>
  )
}

