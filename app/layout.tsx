import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Matego | Matemáticas de tercer grado",
  description:
    "Matego reúne explicaciones, ejemplos resueltos y procedimientos de Matemáticas de tercer grado, organizados en cinco bloques.",
  openGraph: {
    title: "Matego | Matemáticas de tercer grado",
    description: "Explicaciones, ejemplos y procedimientos en cinco bloques.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/og.png",
        alt: "Matego: Matemáticas de tercer grado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matego | Matemáticas de tercer grado",
    description: "Explicaciones, ejemplos y procedimientos en cinco bloques.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
