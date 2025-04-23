"use client"

import RenterCard from "@/components/RenterCard"

export default function ApprovePage(){
    return (
        <main>
            <RenterCard
                name="John Doe"
                tel="081-234-5678"
                email="john.doe@example.com"
                selfieImageUrl="/uploads/selfie-john.jpg"
                idCardImageUrl="/uploads/id-john.jpg"
                onApprove={() => console.log('Approved')}
                onDeny={() => console.log('Denied')}
            />
        </main>
    )
}