import {YouTubePlayer} from "@/components/content/video";

export default function HomePage() {
  return (
    <div className={"w-full"}>
      <section data-testid={"heading-text"} className={"w-full text-center space-y-4 mt-4 md:mt-12"}>
        <h1 className={"tracking-tight font-bold text-4xl sm:text-7xl"}>The IMTDb casus</h1>
        <section className={"text-base max-w-md font-light mx-auto text-left space-y-4"}>
            <h2 className={"font-bold text-2xl"}>Welcome to the casus!</h2>
            <p>
                This website has some functionality that you can use to show off your Test Automation skills.
                You can create a new account, or sign in to any existing accounts that have been made available through the
                `seed` command.
            </p>
            <p>
                If you haven&apos;t run the seed command yet, please do so now since it will also load
                movies into the database.
            </p>
            <section className={"space-y-2"}>
                <h3 className={"text-xl font-bold"}>Docker - seed</h3>
                <p>
                    If you&apos;re running this through <span className={"font-mono"}>docker-compose</span>, open your
                    terminal and run <span className={"font-mono"}>docker ps</span> to get the name of the <strong>backend </strong>
                    container, usually it is <strong>casus_v2_backend_1</strong>. Use that name to run the following command:
                </p>
                <p>
                    <span className={"font-mono"}>docker exec -it casus_v2_backend_1 python -m app.scripts.seed</span>
                </p>
            </section>
            <section className={"space-y-2"}>
                <h3 className={"text-xl font-bold"}>Manual - seed</h3>
                <p>
                    If you&apos;ve started both the frontend and backend services manually, and made sure
                    you have a mongodb instance running and available at <span className={"font-mono"}>http://localhost:27017 </span>
                    then you can run <span className={"font-mono"}>python -m app.scripts.seed</span> from inside the backend
                    directory. Please make sure you&apos;ve installed all the necessary requirements.
                </p>
            </section>
            <section className={"space-y-2"}>
                <h3 className={"text-xl font-bold"}>Ready to go</h3>
                <p>
                    Have a look around the website, see if you can sign in, sign out and notice the changes to the UI
                    when doing so. There are no &apos;business requirements&apos; or &apos;user stories&apos;. If you want
                    to, you can write them yourself.
                </p>
                <p>
                    Some core functionalities are:
                </p>
                <ul className={"list-disc list-inside"}>
                    <li>Sign in</li>
                    <li>Sign out</li>
                    <li>Visit movies from the /movies page</li>
                    <li>Add and remove movies from favorites</li>
                    <li>Search (NotYetImplemented)</li>
                </ul>
                <p>
                    That&apos;s it. Since you&apos;ve made it this far, please enjoy this Adventure Time intro
                </p>
            </section>
        </section>
          <YouTubePlayer videoID={"cvDxko2Zm0Q"} />
      </section>
    </div>
  );
}
