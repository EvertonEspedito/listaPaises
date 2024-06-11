import { Country } from "@/app/page"
import CountryCard from "@/components/country-card";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";


async function getCountryByName(name: string):Promise<Country> {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

    return (await response.json())[0];
}

async function getCountryBorder(name:string) {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: Country[] = await response.json();
    
   const country = countries.find((country: Country)=> country.name.common == name);
   return country.borders?.map(border=>{
       const borderCountry = countries.find(country=>country.cca3 == border)
        return{
            name:borderCountry?.name.common,
            ptName:borderCountry?.translations.por.common,
            flag:borderCountry?.flags.svg,
            flagAlt:borderCountry?.flags.alt,
        }
   })
}

export default async function CountryPage({
    params:{name},
}:{
    params:{name:string}
}) {
    const country = await getCountryByName(name)
    const borderCountries = await getCountryBorder(decodeURI(name))

    const formatter = Intl.NumberFormat("en",{notation:"compact"})

    return (
        <section className="flex flex-col container">
            <h1 className="text-4xl font-bold text-center text-white my-16">{country.translations.por.common}</h1>
            <Link href={`/`} className="flex my-5">
                <img src="/arrow.svg" alt="seta"  className="pl-1" />
                <h3 className="text-white pl-2 font-bold">voltar</h3>
            </Link>
            
            <article className="flex md:flex-row flex-col justify-between min-w-full md:p-20 p-5 bg-white rounded-xl">
                <section className="h-auto pt-10">

                    {country.capital &&(<h2 className="font-bold text-xl text-gray-800"><b className="mr-2">🏙️ Capital:</b>{country.capital}</h2 >)}

                    <h2 className="font-bold text-xl text-gray-800"><b className="mr-2">🗺️ Continente:</b>{country.region} - {country.subregion}</h2 >

                    <h2 className="font-bold text-xl text-gray-800"><b className="mr-2">👨‍👩‍👧‍👦 População:</b>{formatter.format(country.population)}</h2 >

                    {country?.languages && (<h2 className="font-bold text-xl text-gray-800"><b className="mr-2">🗣️ Lingua Falada:</b>{Object.values(country.languages).map((language)=>(
                        <span key={language} className="inline-block text-sm px-2 ml-1 bg-indigo-700 rounded-xl cursor-pointer text-white">
                            {language}
                        </span>
                    ))}</h2 >)}
                </section>
                <div className="relative h-56 w-96 shadow-md md:order-last order-first">
                    <Image
                        src={country.flags.svg}
                        alt={country.flags.alt}
                        fill
                        className="object-cover"
                    />
                </div>
            </article>
            <section>
                <h3 className="mt-12 mb-4 text-2xl font-semibold text-gray-800">Paises que fazem fronteiras</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  w-full container gap-2">
                    {borderCountries?.map((border)=>(
                       <CountryCard { ... border}/>
                    ))}
                </div>
            </section>
        </section>
    )
}