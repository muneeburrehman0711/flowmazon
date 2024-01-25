import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import { title } from "process"

interface SearchPageProps {
    searchParams: { searchquery: string }
}
export function generateMetadata({
    searchParams:{searchquery},
} : SearchPageProps): Metadata{
    return {
        title: `search: ${searchquery} - Flowmazon`
    }

}


export default async function SearchPage({ searchParams: { searchquery } }: SearchPageProps) {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: searchquery, mode: "insensitive" } },
                { description: { contains: searchquery, mode: "insensitive" } },
            ]
        },
        orderBy: { id: "desc" },

    })

    if (products.length === 0) {
        return <div className="text-center"> No Products Found </div>
    }
    return (
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )

}