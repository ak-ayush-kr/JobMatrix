import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useEffect } from 'react'

const InterviewRoom = () => {
    const { roomId } = useParams();
    const { user } = useSelector((state) => state.auth);
    console.log(roomId);
    console.log(user._id);
    const meetingRef = useRef(null);
    const joined = useRef(false);

    useEffect(() => {
        const initMeeting = async () => {
            if (!user || joined.current || !meetingRef.current) return;

            joined.current = true;

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/application/gettoken/${roomId}`, {
                method: "GET",
                credentials: "include",
            }
            );
            if (!res.ok) return;

            const data = await res.json();
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                data.appId,
                data.serverSecret,
                roomId,
                user._id.toString(),
                user.name
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            console.log(data)
            zp.joinRoom({
                container: meetingRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: false,
                showTextChat: false,
                showUserList: false,
                showLayoutButton: false,
                maxUsers: 2,
                turnOnMicrophoneWhenJoining: true,
                turnOnCameraWhenJoining: true,
                showLeavingView: false,
                showRoomTimer: true,
            });
        };

        initMeeting();
    }, [roomId, user]);


    return (
        <div className='w-full min-h-screen bg-white'>
            <div ref={meetingRef} className='w-full max-h-screen' />
        </div>
    )
}

export default InterviewRoom