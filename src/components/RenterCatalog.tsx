"use client";

import RenterCard from "./RenterCard";

export default function RenterCatalog() {
    const mockCards = [
        { name: "John Doe", tel: "081-234-5678", email: "john.doe@example.com", selfieImageUrl: "/uploads/selfie-john.jpg", idCardImageUrl: "/uploads/id-john.jpg" },
        { name: "Jane Smith", tel: "082-345-6789", email: "jane.smith@example.com", selfieImageUrl: "/uploads/selfie-jane.jpg", idCardImageUrl: "/uploads/id-jane.jpg" },
        { name: "Alice Johnson", tel: "083-456-7890", email: "alice.johnson@example.com", selfieImageUrl: "/uploads/selfie-alice.jpg", idCardImageUrl: "/uploads/id-alice.jpg" },
        { name: "Bob Brown", tel: "084-567-8901", email: "bob.brown@example.com", selfieImageUrl: "/uploads/selfie-bob.jpg", idCardImageUrl: "/uploads/id-bob.jpg" },
        { name: "Charlie Green", tel: "085-678-9012", email: "charlie.green@example.com", selfieImageUrl: "/uploads/selfie-charlie.jpg", idCardImageUrl: "/uploads/id-charlie.jpg" },
        { name: "David White", tel: "086-789-0123", email: "david.white@example.com", selfieImageUrl: "/uploads/selfie-david.jpg", idCardImageUrl: "/uploads/id-david.jpg" },
        { name: "Eva Adams", tel: "087-890-1234", email: "eva.adams@example.com", selfieImageUrl: "/uploads/selfie-eva.jpg", idCardImageUrl: "/uploads/id-eva.jpg" }
    ]
  return (
    <>
      <div className="p-4 flex flex-row content-around justify-around flex-wrap gap-6">
              {mockCards.map(card => (
                  <RenterCard
                      name={card.name}
                      tel={card.tel}
                      email={card.email}
                      selfieImageUrl={card.selfieImageUrl}
                      idCardImageUrl={card.idCardImageUrl}
                      onApprove={() => console.log('Approved')}
                      onDeny={() => console.log('Denied')}
                  />
              ))}
      </div>
    </>
  );
}
