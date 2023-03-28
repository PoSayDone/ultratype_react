import { useEffect, useState } from "react"

const useSymbolsTypedMetric = (
    enabled: boolean,
    symbolsTyped: number,
    timeElapsed: number,
    typedString: string
) => {
    const cps = symbolsTyped / timeElapsed
    const cpm = Number((cps * 60).toFixed())
    const wps = (typedString.split(" ")).length / timeElapsed
    const wpm = Number((wps * 60).toFixed())
    return {
        cps,
        cpm,
        wps,
        wpm,
    }
}

export default useSymbolsTypedMetric