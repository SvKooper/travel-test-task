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
                        <p className="font-tektur text-base font-normal leading-[1.2] tracking-[-0.02em] text-white">
                            {answer}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

const Mobile = (_props: Props) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-10 text-white/40">
            <p className="text-sm font-bold uppercase tracking-widest">FAQ — mobile placeholder</p>
        </div>
    )
}
