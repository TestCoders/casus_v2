"use client"

import YouTube from "react-youtube";

export function YouTubePlayer(props: {videoID: string}) {
    return (
        <div className={"mx-auto p-4 rounded-lg w-fit bg-black"}>
            <YouTube videoId={props.videoID} className={"rounded-lg"} />
        </div>
    )
}