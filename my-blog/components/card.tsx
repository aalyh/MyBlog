import Link from "./Link"
import Image from "./Image"
interface CardProps{
    title:string,
    description:string,
    imgSrc:string,
    slug:string,
    github?:string
}
export default function Card ({title, description, imgSrc, slug}:CardProps){
    return(
        <div className="md max-w-[544px] p-4 md:w-1/2">
            <Link href={`/projects/${slug}`} aria-label={`Link to ${title}`}>
                <div className={`${imgSrc && 'h-full'} overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}>
                    {
                        imgSrc && (
                            <Image alt={title} src={imgSrc} className="object-cover object-center md:h-36 lg:h-48" width={544} height={306}></Image>
                        )
                    }
                    <div className="p-6">
                        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
                            {title}
                        </h2>
                        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}