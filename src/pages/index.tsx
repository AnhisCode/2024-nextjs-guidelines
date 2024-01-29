import {signIn, signOut, useSession} from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import {api} from "~/utils/api";

export default function Home() {
    const {data: sessionData} = useSession();

    const {data: secretMessage} = api.post.getSecretMessage.useQuery(
        undefined, // no input
        {enabled: sessionData?.user !== undefined}
    );

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-black">
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                {secretMessage && <span> - {secretMessage}</span>}
            </p>
            <button
                className="rounded-full px-10 py-3 font-semibold text-black no-underline transition"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
            <Link href="/jobs">Jobs site</Link>
        </div>
    );
}