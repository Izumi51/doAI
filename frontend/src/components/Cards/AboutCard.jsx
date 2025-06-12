import { Link } from "react-router";

function AboutCard({title, content, icon, ref}) {
    return(<>
        <section className="flex flex-col justify-between bg-[#f8f9fa] border-1 border-zinc-200 px-5 py-7 rounded-2xl shadow-2xl shadow-[#619afc] transition-transform transform hover:scale-[1.02] hover:drop-shadow-2xl duration-300">
            <section>
                <h1 className="text-blue-700 text-2xl font-nomral tracking-tight mb-3">{title}</h1>
                <p className="px-2 text-[#333333] text-base leading-relaxed text-justify">{content}</p>
            </section>
            <section className="flex justify-end mt-6">
                <Link to={ref} className="size-8 text-zinc-800 hover:text-blue-700">{icon}</Link>
            </section>
        </section>
    </>)
}

export default AboutCard;