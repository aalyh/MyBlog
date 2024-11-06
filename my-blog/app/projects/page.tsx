import Card from "@/components/card";
import { allProjects } from "contentlayer/generated"
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";

export default function ProjectsPage(){
    const projects = allCoreContent(allProjects);
    return(
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="pb-8 pt-6 space-y-2 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Projects
                    </h1>
                    <p className="leading-7 text-gray-500 dark:text-gray-400 text-lg">
                        以下是个人项目成果展示
                    </p>
                </div>
                <div className="container py-12">
                    <div className="-m-4 flex flex-wrap">
                        {projects.map((project)=>(
                            <Card key={project.title} title={project.title} description={project.description} imgSrc={project.imgSrc} github={project.github} slug={project.slug}></Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}