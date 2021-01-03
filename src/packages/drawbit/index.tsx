import React, {useEffect, forwardRef} from "react";

import App from '../../components/App';

const Drawbit= (props)=>{
    const {
        width,
        height,
        offsetLeft,
        offsetTop,
        onChange,
        initialData,
        user,
        onUsernameChange,
        forwardedRef
    } = props;

    useEffect(()=>{
        //Block pinch-zooming on iOS outside of the content area
        const handleTouchMove = (event: TouchEvent)=>{
            //@ts-ignore
            if(typeof event.scale === "number" && event.scale!==1){
                event.preventDefault()
            }
        }

        document.addEventListener("touchmove",handleTouchMove,{passive: false});

        return ()=>{
            document.removeEventListener("touchmove",handleTouchMove);
        }
    },[])

    return (
        <App 
          width={width}
          height={height}
          offsetLeft={offsetLeft}
          offsetTop={offsetTop}
          onChange={onChange}
          initialData={initialData}
          user={user}
          onUsernameChange={onUsernameChange}
          forwardedRef={forwardedRef}
          />
    )
}