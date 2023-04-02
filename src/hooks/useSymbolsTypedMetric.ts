import { useEffect, useState } from "react"

const useSymbolsTypedMetric = (
    enabled: boolean,
    symbolsTyped: number,
    time: number,
    timeLeft: number,
    typedString: string
) => {
    const timeElapsed = time - timeLeft
    const cps = symbolsTyped / timeElapsed
    const cpm = Number((cps * 60).toFixed())
    const wps = (symbolsTyped / 5) / timeElapsed
    const wpm = Number((wps * 60).toFixed())
    return {
        cps,
        cpm,
        wps,
        wpm,
    }
}

export default useSymbolsTypedMetric