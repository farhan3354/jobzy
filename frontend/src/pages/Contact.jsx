import React from "react";
import Map from "../component/contact/Map";
import ContactForm from "../component/contact/ContactForm";

export default function Contact() {
  return (
    <>
      <section className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ContactForm />
          <Map/>
        </div>
      </section>
    </>
  );
}
