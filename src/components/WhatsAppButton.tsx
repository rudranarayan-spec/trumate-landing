import Link from "next/link";

export default function WhatsAppButton() {
  const phoneNumber = "910000000000"; // Replace with your actual WhatsApp phone number with country code
  const message = "Hello Trumate, I would like to inquire about your eco-friendly products and spices.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Official WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-7 fill-current"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448zM11.986 2.152c-5.433 0-9.855 4.422-9.857 9.858-.001 1.737.457 3.435 1.324 4.935l-1.419 5.185 5.31-1.393c1.433.782 3.076 1.196 4.742 1.197 5.433 0 9.855-4.422 9.857-9.858.002-5.435-4.42-9.858-9.855-9.858zm5.405 13.974c-.222.628-1.285 1.154-1.764 1.226-.452.068-1.037.108-3.328-.823-2.825-1.144-4.664-4.043-4.808-4.234-.143-.191-1.148-1.528-1.148-2.913 0-1.385.723-2.068.979-2.348.256-.279.559-.349.745-.349.186 0 .372.001.534.009.172.008.404-.065.632.483.228.548.776 1.898.844 2.037.068.14.114.303.023.487-.091.184-.137.299-.274.463-.137.164-.287.367-.41.493-.137.14-.28.291-.12.564.16.273.712 1.177 1.527 1.906 1.05 936 1.936 1.226 2.21 1.365.274.14.434.117.594-.07.16-.187.686-.798.868-1.071.182-.273.364-.228.614-.137.25.091 1.587.748 1.86 883.273.136.455.227.211.517z"/>
        </svg>
      </Link>
    </div>
  );
}