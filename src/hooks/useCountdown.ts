import {Dispatch, useEffect, useState} from "react"
import {useTypedSelector} from "./useTypedSelector";
import {CountDownActions, CountDownActionTypes} from "../store/reducers/countDownReducer";
import {useDispatch} from "react-redux";

const useCountdown = () => {
	const dispatch: Dispatch<CountDownActions> = useDispatch()
	const [timerId , setTimerId] = useState(0)

	const {timeLeft, timerIsActive} = useTypedSelector(state => state.countDown)

	useEffect(() => {
		if (timeLeft > 0 && timerIsActive) {
			 setTimerId(setTimeout(dispatch, 1000, {
				type: CountDownActionTypes.SET_TIMELEFT,
				payload: timeLeft - 1
			}));
		} else {
			clearTimeout(timerId)
			dispatch({
				type: CountDownActionTypes.SET_TIMER_ISACTIVE,
				payload: false
			})
		}
	}, [timeLeft, timerIsActive]);

	function setTimerIsActive(isActive: boolean) {
		dispatch({
			type: CountDownActionTypes.SET_TIMER_ISACTIVE,
			payload: isActive
		})
	}

	function setTimeLeft(time : number){
		dispatch({
			type: CountDownActionTypes.SET_TIMELEFT,
			payload: time
		})
	}

	return {
		timeLeft, timerIsActive, setTimerIsActive , setTimeLeft
	}
}

export default useCountdown