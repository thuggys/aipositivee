import React, { useState } from 'react';
// Import other necessary components
import ChatPage from './ChatPage'; // Example import, adjust based on your actual components
import HomeScreen from './HomeScreen'; // Import HomeScreen

function MainComponent() {
    const [settings, setSettings] = useState({ fontSize: '16px' });
    const [isChatStarted, setIsChatStarted] = useState(false);

    const updateSettings = (newSettings) => {
        setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    };

    const handleStartChat = () => {
        setIsChatStarted(true);
    };

    return (
        <div>
            {isChatStarted ? (
                <ChatPage settings={settings} updateSettings={updateSettings} />
            ) : (
                <HomeScreen onStartChat={handleStartChat} />
            )}
        </div>
    );
}

export default MainComponent;