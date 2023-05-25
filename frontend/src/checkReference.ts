import { Dispatch, SetStateAction } from "react";
import { Location } from "react-router";

export default function checkReference(e: KeyboardEvent,loc: Location ){
    let pathToRelocate ="https://ultratype.cc/";
    if(e.ctrlKey && e.key == 'F1'){
        switch(loc.pathname){
            case "/":
                pathToRelocate+="overview.htm"
                break;
            case "/typing":
                pathToRelocate+="pechat.htm"
                break;
            case "/settings":
                pathToRelocate+="settings.htm"
                break;
            case "/profile":
                pathToRelocate+="profil.htm"
                break;
        }
        console.log(pathToRelocate);
        window.open(pathToRelocate);
    }
}