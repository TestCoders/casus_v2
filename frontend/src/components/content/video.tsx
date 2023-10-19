"use client"

import YouTube from "react-youtube";

export function YouTubePlayer(props: {videoID: string, title?: string}) {
    return (
        <div className={"p-4 rounded-lg w-fit h-fit bg-black"}>
            <YouTube videoId={props.videoID} className={"rounded-lg"} title={`trailer-${props.title}`}  />
        </div>
    )
}