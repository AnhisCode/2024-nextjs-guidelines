import {api} from "~/utils/api";
import {useState} from "react";
import {useSession} from "next-auth/react";
import Link from "next/link";

const Jobs = () => {
    const {data: session} = useSession()
    const {data: userData, isLoading, refetch} = api.post.getJobs.useQuery()
    const [newJobLoading, setNewJobLoading] = useState(false)
    const createNewJob = api.post.createJob.useMutation()

    return (
        <div>
        <h1>{JSON.stringify(userData)}</h1>
            {session ? <button onClick={async () => {
                setNewJobLoading(true)
                await createNewJob.mutateAsync()
                await refetch()
                setNewJobLoading(false)
            }}>
                Create New Job
            </button> : <p>Sign in to create a new job</p>}
            {newJobLoading && <p>Creating new job...</p>}
            <Link href="/">Home</Link>
        </div>
    );
}

export default Jobs;