import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/e-commerce/product/category/')({
  component: ProductCategoryManagement,
})

function ProductCategoryManagement() {
  return <div>Hello "/_dashboard/e-commerce/product/category/"!</div>
}
