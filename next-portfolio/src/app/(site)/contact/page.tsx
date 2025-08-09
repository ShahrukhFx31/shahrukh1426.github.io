
import { ContactMapRealtime } from "@/components/contact/contact-map-realtime";

export default async function ContactPage() {

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <ContactMapRealtime />
      <p className="text-gray-600">Add a contact form integrated with email or functions later.</p>
    </main>
  );
}


