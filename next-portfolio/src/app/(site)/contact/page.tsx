
export default async function ContactPage() {
  // Map is rendered via AboutRealtime content (profiles.googleMap). For now, show a hint.
  const mapUrl: string | undefined = undefined;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Contact</h1>
      {mapUrl && (
        <div className="rounded-lg overflow-hidden border">
          <iframe
            src={mapUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
      <p className="text-gray-600">Add a contact form integrated with email or functions later.</p>
    </main>
  );
}


