import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Kết nối WebSocket
    const socket = new SockJS("http://localhost:9999/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/chat", (message) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && input.trim()) {
      stompClient.send(
        "/app/send",
        {},
        JSON.stringify({ message: input.trim() })
      );
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Chat Room</h1>
        <div className="mb-4 space-y-2 h-64 overflow-y-auto border rounded-lg p-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className="text-gray-700">
              <span className="font-bold">{msg.user.name}:</span> {msg.message}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="w-full p-2 border rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
