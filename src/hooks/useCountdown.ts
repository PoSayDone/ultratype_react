import {Dispatch, useEffect} from "react"
import {useTypedSelector} from "./useTypedSelector";
import {CountDownActions, CountDownActionTypes} from "../store/reducers/countDownReducer";
import {useDispatch} from "react-redux";

const useCountdown = () => {
	const dispatch: Dispatch<CountDownActions> = useDispatch()

	const {timeLeft, timerIsActive} = useTypedSelector(state => state.countDown)

	// const [timeLeft, setTimeLeft] = useState(time);
	// const [timerIsActive, setTimerIsActive] = useState(false);

	useEffect(() => {
		if (timeLeft > 0 && timerIsActive) {
			setTimeout(dispatch, 1000, {
				type: CountDownActionTypes.SET_TIMELEFT,
				payload: timeLeft - 1
			});
		} else {
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

	return {
		timeLeft, timerIsActive, setTimerIsActive
	}
}

export default useCountdown