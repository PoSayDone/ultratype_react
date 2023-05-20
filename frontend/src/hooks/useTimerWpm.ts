import {useEffect, useState} from "react";

export default function useTimerWpm(typed: string , timeLeft: number){
	const [wpm , setWpm ] = useState(0)

	useEffect(() => {
		const minutes = timeLeft / 60
		const words = typed.length/5
		const wpm = Math.round(words/minutes)
		setWpm(wpm)
	},[typed,timeLeft])

	return wpm
}