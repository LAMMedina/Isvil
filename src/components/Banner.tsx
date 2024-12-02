import React from "react";

export default function Banner () {
    return (
    <div className="px-8 py-2 dark:bg-gray-50 dark:text-gray-800 hidden md:block">
	<div className="flex items-center mx-auto container justify-center md:justify-between py-2">
		<div className="flex space-x-4">
			<span>ventas@medical_isvil.com.pe</span>
			<span> medical_isvil@hotmail.com</span>
		</div>
		<a href="https://wa.link/3dhkr0" target="_blank" rel="noopener noreferrer" className="items-center gap-2 hidden md:flex">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
			<span className="hover:underline focus-visible:underline">+51 972 708 799</span>
		</a>
	</div>
</div>
    );
}