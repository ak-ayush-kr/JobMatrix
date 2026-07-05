import React from 'react'
import {useEffect} from "react";
import { getSocket } from '../utils/socket';

function Notice(){
    useEffect(() => {
        const socket = getSocket();
        socket?.on("newNotification",(notification) => {
                console.log(notification);
                console.log("new notice ayi hai ayi hai");
            }
        );
        return () => {
            socket?.off("newNotification");
        };
    }, []);
    return (
        <div>Notice</div>
    )
}

export default Notice;
