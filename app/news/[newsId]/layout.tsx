import Loading from "@/app/loading"
import { Suspense } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
    )
}