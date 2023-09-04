import { Link } from "raviger";

export default function ErrorPage(){
    return <div>
        <h1 className="text-9xl text-center">404</h1>
        <p className="text-center">Page you are looking for isn't found. <Link href="/" className="text-blue-600"> Go to home</Link></p>
    </div>
}