import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../utils/socket";
import { addNotice } from "../../redux/noticeSlice";

export const SocketProvider = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user?._id) return;

        const socket = getSocket();
        if (!socket) return;

        const handleNotification = (notification) => {
            console.log("New notification received:", notification);
            dispatch(addNotice(notification));
        };

        socket.on("newNotification", handleNotification);
        console.log("listenting to notice");
        return () => {
            console.log("unlistening");
            socket.off("newNotification", handleNotification);
        };
    }, [user, dispatch]);

    return null;
}