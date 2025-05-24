import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_dashboard/e-commerce/product/category/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/e-commerce/product/category/"!</div>
}
