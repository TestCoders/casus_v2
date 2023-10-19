import {MovieDetail} from "@/components/content/movie-detail";

export default function MovieDetailPage({params} : {params: {id: string}}) {
    return (
        <MovieDetail imdb={params.id} />
    )
}