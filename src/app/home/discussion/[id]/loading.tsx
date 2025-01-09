export default function Loading() {
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <video autoPlay loop muted playsInline>
                <source src="/animation/loading.webm" type="video/webm" />
            </video>
            <h1 className="text-2xl">loading...</h1>
        </div>
    )
}