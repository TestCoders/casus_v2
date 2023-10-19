"use client"

import Link from "next/link";
import Image from "next/image";
import {useDataStore} from "@/lib/store";

function HeartIcon(props: { filled: boolean }) {
    if (props.filled) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
            </svg>
        )
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
        </svg>

    )
}

function FavoriteButton(props: { imdb: string }) {
    const favorites = useDataStore((state) => state.favorites);
    const like = useDataStore((state) => state.like);
    const dislike = useDataStore((state) => state.dislike);
    const isFavorite = !!favorites.get(props.imdb)

    const onClick = async () => {
        if (isFavorite) {
            await fetch(`http://localhost:8000/api/users/current/favorites/${props.imdb}`, {method: "DELETE", credentials: "include"})
            dislike(props.imdb);
        } else {
            await fetch(`http://localhost:8000/api/users/current/favorites/${props.imdb}`, {method: "PUT", credentials: "include"})
            like(props.imdb);
        }
    }

    return (
        <button data-testid={`favorite-${props.imdb}`} onClick={onClick} className={"bg-gray-400/70 p-2 rounded-lg"}>
            <HeartIcon filled={isFavorite}/>
        </button>
    )
}

function MovieCard({movie}: { movie: Movie }) {
    const signedIn = useDataStore((state) => state.signedIn);

    return (
        <div data-testid={`movie-${movie.imdb}`}
             className={"relative min-w-[150px] max-w-[150px] mx-2 text-center group"}>
            <div
                className={"absolute top-0 left-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 h-[225px] w-[150px] bg-yellow-700/80 rounded-lg "}>
                <Link href={`/movies/${movie.imdb}`} className={"text-lg font-bold"}>View</Link>
            </div>
            <div className={"absolute top-2 right-2"}>
                {signedIn && <FavoriteButton imdb={movie.imdb}/>}
            </div>
            <div className={"rounded-lg overflow-hidden"}>
                <Image src={movie.image} alt={movie.title} height={"225"} width={"150"}/>
            </div>
            <h3 className={"truncate"}>{movie.title}</h3>
            <div className={"text-gray-400 text-sm"}>{movie.year}</div>
        </div>
    )
}

export function HorizontalView(props: { heading: string, movies: Movie[] }) {
    return (
        <div data-testid={`horizontal-view-${props.heading}`}
             className={"p-8 w-full max-w-7xl min-h-[380px] text-left"}>
            <h2 className={"text-2xl uppercase mb-2 font-semibold tracking-wider"}>{props.heading}</h2>
            {!!props.movies.length && (
                <div className={"flex overflow-x-auto max-w-7xl"}>
                    {props.movies.map(movie => (
                        <MovieCard movie={movie} key={movie.imdb}/>
                    ))}
                </div>
            )}
            {!props.movies.length && (
                <div className={"flex flex-col items-center justify-center h-[269px] text-gray-400"}>
                    No {props.heading.toLowerCase()} yet
                </div>
            )}
        </div>
    )
}
