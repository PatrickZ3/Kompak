"use client"

import React, { Suspense } from "react"
import VerifyEmailContent from "@/components/verifyEmailContent" 

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
