"use client"

import {HorizontalView} from "@/components/content/movies";
import {useDataStore} from "@/lib/store";
import useSWR from "swr";

export default function MoviesPage() {
    const signedIn = useDataStore((state) => state.signedIn)
    const fetchMovies = async () => {
        const response = await fetch("http://localhost:8000/api/movies", {
            method: "GET",
            credentials: "include",
        });

        return await response.json() as Movie[];
    }

    const {data} = useSWR("movies", fetchMovies, {
        suspense: true,
    });
    const favorites = useDataStore((state) => state.favorites);

    let favoriteMovies: Movie[] = [];
    if (favorites.get !== undefined) {
        favoriteMovies = data.filter(movie => !!favorites?.get(movie.imdb));
    }

    return (
        <>
            {signedIn && <HorizontalView heading={"Favorites"} movies={favoriteMovies} />}
            <HorizontalView heading={"Movies"} movies={data} />
        </>
    )
}