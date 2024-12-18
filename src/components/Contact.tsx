// src/components/Contacto.jsx
import React, { useState } from "react";

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      // Enviar el formulario usando fetch
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        mode: "no-cors", // Importante para evitar problemas de CORS con Google Forms
      });

      if (response.ok || response.type === "opaque") {
        setIsSubmitted(true);
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-6 bg-six dark:text-gray-900">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-4xl font-bold">Ponte en contacto con nosotros</h1>
          <p className="pt-2 pb-4">
            Rellena el formulario para iniciar una conversación
          </p>
          <div className="space-y-4">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"></path>
              </svg>
              <span>
                Mza. B Lote. 21 Int. 202 APV. Los Pinos - I Etapa ( Av.Sta Maria
                Alt. Mdo. Nazaren) Lima - Lima - San Martin de Porres.
              </span>
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span className="mr-4">+51 972 708 799</span>  <span> +51 946 846 060 </span>
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>ventas@medical_isvil.com.pe</span>
            </p>
          </div>
        </div>
        <form
      id="contacto-form"
      className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
      method="post"
      action="https://docs.google.com/forms/d/e/1FAIpQLScvdnbbOnp03qXSMgv9JJv5GmdLAmmCUhSxKXEdwcaxwEhkIg/formResponse?submit=Submitusp=pp_url"
      onSubmit={handleSubmit}
    >
      <label className="block">
        <span className="mb-1">Nombre Completo</span>
        <input
          type="text"
          placeholder="Juan Flores"
          className="block w-full border rounded-md px-4 py-2 cursor-text focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
          name="entry.1044486541"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1">Correo Electrónico</span>
        <input
          type="email"
          placeholder="juan@flores.com"
          className="block w-full border rounded-md px-4 py-2 cursor-text focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
          name="entry.698655363"
          required
        />
      </label>
      <label className="block">
        <span className="mb-1">Mensaje</span>
        <textarea
          rows={3}
          className="block w-full border rounded-md  cursor-text focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500"
          name="entry.1815156243"
          required
        ></textarea>
      </label>
      <input
        type="hidden"
        value="NO"
        name="entry.1250098643"
      />
      <button
        type="submit"
        className={`self-center px-6 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 ${isSubmitted ? 'opacity-60 bg-orange-600 cursor-not-allowed text-white' : 'dark:bg-orange-600 dark:text-gray-50 focus:dark:ring-orange-600 hover:dark:ring-orange-600'}`}
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitting ? 'Cargando...' : isSubmitted ? 'Enviado' : 'Enviar'}
      </button>
      { isSubmitted && <p className="text-orange-600 text-center ">¡Gracias, nos pondremos en contacto lo más pronto posible!</p>}
    </form>
      </div>
    </section>
  );
}
