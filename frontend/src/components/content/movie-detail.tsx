"use client"

import useSWR from "swr";
import {notFound} from "next/navigation";
import Image from "next/image";
import {YouTubePlayer} from "@/components/content/video";
import {FavoriteButton} from "@/components/content/movies";

const fetcher = async (id: string) => {
    const response = await fetch(`http://localhost:8000/api/movies/${id}`);

    if (response.status !== 200) {
        return null;
    }

    return await response.json() as Movie
}


export function MovieDetail(props: {imdb: string}) {
    const {data, isLoading} = useSWR(`movie-${props.imdb}`, () => fetcher(props.imdb));

    if (data === null && !isLoading) {
        return notFound();
    }

    if (isLoading || !data) {
        return null;
    }

    const runtime = `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`

    return (
        <div className={"flex flex-col w-full"}>
            <section className={"relative w-full h-[500px] p-6 rounded-lg overflow-hidden"} style={{
                backgroundImage: `url(${data.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className={"relative z-50 flex space-x-6"}>
                    <Image src={data.image} alt={data.title} height={"450"} width={"300"} className={"rounded-lg shrink-0 grow max-h-[450px] max-w-[300px]"} />
                    <div className={"flex flex-col space-y-6 my-14"}>
                        <div>
                            <h2 className={"text-4xl font-semibold text-white"}>{data.title} <span className={"font-normal text-gray-200"}>({data.year})</span></h2>
                            <div className={"flex space-x-2 text-lg text-white font-light"}>
                                <span>{data.release_date}</span>
                                <span>{data.genres.join(", ")}</span>
                                <span>{runtime}</span>
                            </div>
                        </div>
                        <div className={"flex flex-col space-y-6 text-white"}>
                            <span className={"block text-gray-300 text-xl italic"}>{data.tagline}</span>
                            <section className={"space-y-1"}>
                                <h3>Overview</h3>
                                <p className={"w-3/4"}>{data.description}</p>
                            </section>
                        </div>
                    </div>
                    <FavoriteButton imdb={data.imdb} className={"flex flex-col items-center justify-center w-12 h-12"} />
                </div>
                <div className={"absolute top-0 left-0 w-full h-full bg-gray-900 opacity-80"}></div>
            </section>
            <section className={"p-2 sm:p-4 lg:px-4 py-6 space-y-2"}>
                <h2 className={"text-2xl font-bold"}>Media</h2>
                <YouTubePlayer videoID={data.trailer} />
            </section>
        </div>
    )
}