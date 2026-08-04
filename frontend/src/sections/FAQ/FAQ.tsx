import {FaqList} from "@/components/faq/FaqList.tsx";
import {useFaq} from "@/sections/FAQ/hooks/useFaq.ts";


function FAQ() {
  const faq = useFaq();

  return (
    <section id="faq" className="flex flex-col w-full bg-neutral-950 h-dvh">
      <div className="flex h-20 items-center border-b border-white/10 px-6 sm:px-10">
        <p className="font-oswald text-[28px] font-bold uppercase tracking-[-0.02em] text-white">FAQ</p>
      </div>

      <FaqList faq={faq}/>
    </section>
  )
}

export default FAQ
