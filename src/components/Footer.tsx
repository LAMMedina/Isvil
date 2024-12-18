// src/components/Footer.tsx
import React, {useState} from 'react';

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      // Enviar el formulario usando fetch
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        mode: 'no-cors', // Importante para evitar problemas de CORS con Google Forms
      });

      if (response.ok || response.type === 'opaque') {
        setIsSubmitted(true);
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="px-4 divide-y bg-six dark:text-gray-800">
	<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="/" className="flex justify-center space-x-3 lg:justify-start">
				<div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-orange-200">
					<img src="/img/logo-no-fondo.png" alt="" />
				</div>
				<span className="self-center text-2xl font-semibold">Medical Isvil SAC</span>
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900">Enlaces</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="/">Inicio</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/productos">Productos</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/sobre-nosotros">Sobre Nosotros</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/termsOfService">Términos y Condiciones</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<div className="uppercase dark:text-gray-900">Redes Sociales</div>
				<div className="flex justify-start space-x-3">
					<a rel="noopener noreferrer" target='_blank' href="https://www.facebook.com/MedicalIsvilSAC/" title="Facebook" className="flex items-center p-1">
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
							<path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
						</svg>
					</a>
					<a rel="noopener noreferrer" target='_blank' href="https://www.instagram.com/medical_isvil" title="Instagram" className="flex items-center p-1">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 fill-current">
							<path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
						</svg>
					</a>
					<a rel="noopener noreferrer" target='_blank' href="https://www.tiktok.com/@medical_isvil" title="TikTok" className="flex items-center p-1">	
					<svg width="24" height="24" fill="none">
						<g clipPath="url(#a)">
						<path fill="url(#b)" d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z"/>
						<path fill="url(#c)" d="M18 9a3 3 0 0 1-3-4h-2v10a2 2 0 1 1-2-2v-2a4 4 0 1 0 4 4v-5l3 1V9Z"/>
						<path fill="url(#d)" d="M18 8a3 3 0 0 1-4-3h-2v9a2 2 0 1 1-1-2v-2a4 4 0 1 0 3 4V9l4 2V8Z"/>
						<path fill="url(#e)" d="m18 9-2-2-2-2h-1v10a2 2 0 0 1-4 1 2 2 0 0 1 2-4v-1a4 4 0 0 0-4 7 4 4 0 0 0 7-4V9l4 2V9Z"/>
						</g>
						<defs>
						<linearGradient id="b" x1="-.1" x2="23.9" y1="24.1" y2=".1" gradientUnits="userSpaceOnUse">
						<stop stopColor="#111"/>
						<stop offset="1" stopColor="#323232"/>
						</linearGradient>
						<linearGradient id="c" x1="7.2" x2="17.3" y1="17.7" y2="7.6" gradientUnits="userSpaceOnUse">
						<stop stopColor="#B5053C"/>
						<stop offset=".2" stopColor="#C90441"/>
						<stop offset=".7" stopColor="#F0014B"/>
						<stop offset="1" stopColor="#FF004F"/>
						</linearGradient>
						<linearGradient id="d" x1="6.4" x2="17" y1="17.2" y2="6.5" gradientUnits="userSpaceOnUse">
						<stop stopColor="#00B2C9"/>
						<stop offset=".3" stopColor="#00C8D4"/>
						<stop offset=".7" stopColor="#00E6E4"/>
						<stop offset="1" stopColor="#00F1EA"/>
						</linearGradient>
						<linearGradient id="e" x1=".4" x2="23.9" y1="23.8" y2=".3" gradientUnits="userSpaceOnUse">
						<stop stopColor="#DDE3E4"/>
						<stop offset="1" stopColor="#FCF7F7"/>
						</linearGradient>
						<clipPath id="a">
						<path fill="#fff" d="M0 0h24v24H0z"/>
						</clipPath>
						</defs>
					</svg>
					</a>	
				</div>	
			</div>
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900">Suscripción al Newsletter</h3>
				<form id='newsletter-form' action="https://docs.google.com/forms/d/e/1FAIpQLScvdnbbOnp03qXSMgv9JJv5GmdLAmmCUhSxKXEdwcaxwEhkIg/formResponse?submit=Submitusp=pp_url" method="POST" onSubmit={handleSubmit}>
					<input type="email" placeholder="Tu correo electrónico" name='entry.698655363' className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:placeholder-transparent" required />
					<input type="hidden" name="entry.1250098643" value="SI"/>
					<button type="submit" className={`w-full mt-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${isSubmitted ? 'bg-orange-600 opacity-60 cursor-not-allowed text-white' : ''}`} disabled={isSubmitting || isSubmitted}>
						{isSubmitting ? 'Cargando...' : isSubmitted ? 'Enviado' : 'Suscribirse'}
					</button>
					{ isSubmitted && <p className="text-orange-600 text-center  ">¡Gracias por suscribirte!</p>}
				</form>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center dark:text-gray-600">© 2024 Medical Isvil - SAC. Todos los derechos reservados.</div>
</footer>
  );
}