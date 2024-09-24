import React, { useState } from 'react';

function NotificationDisplay() {
    const [isVisible, setIsVisible] = useState(true); // Keep visible by default

    // Return null if the notification is not visible
    if (!isVisible) return null;

    return (
        <div className="fixed top-11 right-0 m-4  bg-opacity-30 backdrop-blur-sm flex justify-center items-start">
            <div className="bg-gray-300 border-amber-500 p-6 rounded-lg shadow-lg w-80">
                {/*<h2 className="text-xl font-bold mb-4">Notification</h2>*/}
                <p className="mb-4">No recent Notifications</p>
                {/*<button*/}
                {/*    onClick={() => setIsVisible(false)} // Hide notification*/}
                {/*    className=" bg-orange-500 hover:bg-orange-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">*/}
                {/*    Close*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default NotificationDisplay;