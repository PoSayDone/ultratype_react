import "./Keyboard.module.scss";
import data from "./Keyboard.module.json";
import { useEffect, useState } from "react";


const Keyboard = () => {

    const [isUpperCase, setIsUpperCase] = useState(false); 

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
        document.addEventListener('keyup', detectKeyUp, true)
    }, [])


    const detectKeyDown = (e : any) => {
        if (e.key === 'Shift') {
            setIsUpperCase(true)
        }
    }

    const detectKeyUp = (e : any) => {
        if (e.key === 'Shift') {
            setIsUpperCase(false)
        }
    }

  return (
    <div className="keyboard">
        <div className="keyboard__row r1">
            { data.qwerty.keys.row1.map((key:string) => {
                return(
                    <div className="keyboard__button" data-key={key}>{isUpperCase ? key.slice(-1) : key.slice(0,-1)}</div>
                )
            })}
            <div className="keyboard__button backspace"></div>
        </div>
        <div className="keyboard__row r2">
            <div className="keyboard__button tab"></div>
            { data.qwerty.keys.row2.map((key:string) => {
                return(
                    <div className="keyboard__button" data-key={key}>{isUpperCase ? key.slice(-1) : key.slice(0,-1)}</div>
                )
            })}
        </div>
        <div className="keyboard__row r3">
            <div className="keyboard__button caps"></div>
            { data.qwerty.keys.row3.map((key:string) => {
                return(
                    <div className="keyboard__button" data-key={key}>{isUpperCase ? key.slice(-1) : key.slice(0,-1)}</div>
                )
            })}
            <div className="keyboard__button enter"></div>
        </div>
        <div className="keyboard__row r4">
            <div className="keyboard__button shift"></div>
            { data.qwerty.keys.row4.map((key:string) => {
                return(
                    <div className="keyboard__button" data-key={key}>{isUpperCase ? key.slice(-1) : key.slice(0,-1)}</div>
                )
            })}
            <div className="keyboard__button shift"></div>
        </div>
        <div className="keyboard__row r5">
            <div className="keyboard__button"></div>
            <div className="keyboard__button"></div>
            <div className="keyboard__button"></div>
            <div className="keyboard__button space"></div>
            <div className="keyboard__button"></div>
            <div className="keyboard__button"></div>
            <div className="keyboard__button"></div>
            <div className="keyboard__button"></div>
        </div>
    </div>
  )
}

export default Keyboard