import * as Accordion from "@radix-ui/react-accordion";
import type {FaqItem} from "@/domain/faq.ts";

const COLUMNS = 3

interface Props {
    faq: FaqItem[]
}

export const FaqList = (props: Props) => {
    return (
        <>
            <div className="hidden lg:flex flex-row flex-1">
                <Desktop {...props}/>
            </div>
            <div className="flex flex-row flex-1 lg:hidden">
                <Mobile {...props}/>
            </div>
        </>
    )
}

const Desktop = ({faq}: Props) => {
    const totalRows = Math.ceil(faq.length / COLUMNS)

    return (
        <div className="grid grid-cols-3">
            {faq.map(({id, question, answer}, index) => {
                const isLastColumn = (index + 1) % COLUMNS === 0
                const isLastRow = Math.floor(index / COLUMNS) === totalRows - 1

                return (
                    <div
                        key={id}
                        className={`flex flex-col items-start gap-6 p-10 border-white/10 ${isLastColumn ? '' : 'border-r'} ${isLastRow ? '' : 'border-b'}`}
                    >
                        <h3 className="font-oswald text-2xl leading-none font-normal uppercase tracking-[-0.02em] text-white">
                            {question}
                        </h3>
                        <p className="font-tektur text-base font-light leading-[1.2] tracking-[-0.02em] text-white">
                            {answer}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

const Mobile = ({faq}: Props) => {
    return (
        <Accordion.Root type="single" collapsible className="flex w-full flex-col">
            {faq.map(({id, question, answer}) => (
                <Accordion.Item
                    key={id}
                    value={String(id)}
                    className="border-b border-white/10 last:border-b-0"
                >
                    <Accordion.Header>
                        <Accordion.Trigger className="group flex w-full items-start justify-between gap-4 p-6 text-left">
                            <h3 className="font-oswald text-xl font-normal uppercase leading-tight tracking-[-0.02em] text-white">
                                {question}
                            </h3>
                            <span className="relative mt-1 h-4 w-4 shrink-0">
                                <span className="absolute top-1/2 left-0 h-[2px] w-4 -translate-y-1/2 bg-white"/>
                                <span className="absolute top-0 left-1/2 h-4 w-[2px] -translate-x-1/2 bg-white transition-transform duration-300 group-data-[state=open]:scale-y-0"/>
                            </span>
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <p className="font-tektur px-6 pb-6 text-base leading-[1.2] font-light tracking-[-0.02em] text-white">
                            {answer}
                        </p>
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}
