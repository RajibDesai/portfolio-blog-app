import ContactForm from '@/components/ContactForm'; // Client Component

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">Contact Me</h1>
      <p className="text-center text-gray-600 mb-8">
        Have a question or want to work together? Leave a message below.
      </p>
      <ContactForm />
    </div>
  );
}