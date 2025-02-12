import React, { useState, useEffect } from "react";

const ChatbotPage = () => {
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [botResponses, setBotResponses] = useState({});
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Load responses from JSON file
        fetch("/responses.json")
            .then(response => response.json())
            .then(data => {
                const responseMap = {};
                data.responses.forEach(item => {
                    responseMap[item.question.toLowerCase()] = item.answer;
                });

                setBotResponses(responseMap);
                setSuggestions(data.responses.map(item => item.question));
            })
            .catch(error => console.error("Error loading responses:", error));
    }, []);

    useEffect(() => {
        const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/chatbot/");

        newSocket.onopen = () => console.log("WebSocket connected");

        newSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const userMessage = data.message.split(": ")[1].toLowerCase();

            let botMessage = botResponses[userMessage] || "I didn't understand that.";

            setChatMessages((prevMessages) => [
                ...prevMessages,
                { from: "bot", message: botMessage }
            ]);
        };

        newSocket.onerror = (error) => console.log("WebSocket error:", error);
        newSocket.onclose = () => console.log("WebSocket disconnected");

        setSocket(newSocket);

        return () => newSocket.close();
    }, [botResponses]);

    const handleMessageSend = () => {
        if (message && socket) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { from: "user", message: message }
            ]);

            socket.send(JSON.stringify({ message }));
            setMessage("");
        }
    };

    const handleSuggestionClick = (text) => {
        setMessage(text);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Chatbot
                </h2>

                <div className="flex gap-2 flex-wrap mb-4">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm hover:bg-gray-300"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

                <div className="border border-gray-300 p-4 rounded-md h-72 overflow-y-scroll">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                            <p className={`p-2 rounded-lg max-w-xs ${msg.from === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                {msg.from === "user" ? "You: " : "Bot: "} {msg.message}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleMessageSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;
