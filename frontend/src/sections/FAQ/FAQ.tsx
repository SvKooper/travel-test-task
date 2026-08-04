import {FaqList} from "@/components/faq/FaqList.tsx";
import type {FaqItem} from "@/domain/faq.ts";

interface FAQProps {
  faq: FaqItem[]
}

function FAQ({faq}: FAQProps) {
  return (
    <section id="faq" className="flex flex-col w-full bg-neutral-950 min-h-dvh">
      <div className="flex h-20 items-center border-b border-white/10 px-6 sm:px-10">
        <p className="font-oswald text-[28px] font-bold uppercase tracking-[-0.02em] text-white">FAQ</p>
      </div>

      <FaqList faq={faq}/>
    </section>
  )
}

export default FAQ
