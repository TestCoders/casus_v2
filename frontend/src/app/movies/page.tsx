"use client"

import {HorizontalView} from "@/components/content/movies";
import {useDataStore} from "@/lib/store";
import useSWR from "swr";

const fetchMovies = async () => {
    const response = await fetch("http://localhost:8000/api/movies", {
        method: "GET",
        credentials: "include",
    });

    return await response.json() as Movie[];
}

export default function MoviesPage() {
    const [signedIn, favorites] = useDataStore((state) => [state.signedIn, state.favorites])
    const {data} = useSWR("movies", fetchMovies, {
        suspense: true,
    });

    const favoriteMovies: Movie[] = data.filter(movie => !!favorites[movie.imdb]);

    return (
        <>
            {signedIn && <HorizontalView heading={"Favorites"} movies={favoriteMovies} />}
            <HorizontalView heading={"Movies"} movies={data} />
        </>
    )
}