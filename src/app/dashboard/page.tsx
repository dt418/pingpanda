import { redirect } from "next/navigation"

import { currentUser } from "@clerk/nextjs/server"
import { PlusIcon } from "lucide-react"

import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { DashboardPage } from "@/components/dashboard-page"
import { PaymentSuccessModal } from "@/components/payment-success-modal"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { createCheckoutSession } from "@/lib/stripe"

import { DashboardPageContent } from "./dashboard-page-content"

interface PageProps {
  searchParams: Promise<
    {
      [key: string]: string | string[] | undefined
    } & {
      intent?: string
      success?: string
    }
  >
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    return redirect("/welcome")
  }

  const { intent, success } = await searchParams

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })

    if (session.url) redirect(session.url)
  }

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}

      <DashboardPage
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="mr-2 size-4" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}

export default Page
