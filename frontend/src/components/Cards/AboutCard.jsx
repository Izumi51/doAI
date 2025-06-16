import { Link } from "react-router";

function AboutCard({title, content, icon, ref}) {
    return(<>
        <section className="flex flex-col justify-between bg-[#f8f9fa] border border-zinc-200 px-4 lg:px-5 py-6 lg:py-7 rounded-2xl shadow-lg hover:shadow-2xl shadow-[#619afc]/30 hover:shadow-[#619afc]/50 transition-all transform hover:scale-[1.02] duration-300 min-h-[280px] lg:min-h-[300px]">
            <section>
                <h1 className="text-blue-700 text-lg lg:text-xl xl:text-2xl font-normal tracking-tight mb-3 lg:mb-4">{title}</h1>
                <p className="px-1 lg:px-2 text-[#333333] text-sm lg:text-base leading-relaxed text-justify">{content}</p>
            </section>
            <section className="flex justify-end mt-4 lg:mt-6">
                <Link to={ref} className="w-7 h-7 lg:w-8 lg:h-8 text-zinc-800 hover:text-blue-700 transition-colors">{icon}</Link>
            </section>
        </section>
    </>)
}

export default AboutCard;