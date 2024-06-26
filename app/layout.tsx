import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Paises",
  description: "Generated by Everton Espedito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>

          <main className="bg-cyan-800 min-h-screen flex flex-col items-center">
            <nav className="
            w-full 
            bg-cyan-700 
            h-16 
            flex 
            items-center 
            justify-center">
              <section className="
              container 
              flex 
              items-center
              gap-3">
                <Link href={`/`} className="flex">
                  <img className="pl-1" src="/logo.svg" alt="Logo Terra"/>
                  <h1 className="font-bold text-2xl text-slate-300 pl-1">Lista de Paises</h1>
                </Link>  
              </section>
            </nav>
            {children}
          </main>
        </body>
    </html>
  );
}
