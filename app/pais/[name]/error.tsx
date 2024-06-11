'use client'
import Link from "next/link"
import Image from "next/image"

export default function erro() {
    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl	 text-center font-bold text-white my-16">
                Ops, ocorreu um erro ao carregar esse Pais T-T
            </h1>
            <Link className="flex items-center py-2" href="/">
                <Image
                    src="/arrow.svg"
                    alt="seta para voltar"
                    width={24}
                    height={24}
                />
                Voltar
            </Link>
        </section>
    )
}