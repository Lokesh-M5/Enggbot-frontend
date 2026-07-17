import { useState, useRef, useEffect } from "react";
import API from "../services/api";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm EnggBot. Ask me anything about careers, AI/ML, placements, projects, internships, resumes, coding, or technology."
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setError("");

      const userMessage = message;

      const updatedChat = [
        ...chat,
        {
          sender: "user",
          text: userMessage
        }
      ];

      setChat(updatedChat);
      setMessage("");

      const res = await API.post(
        "/chatbot/chat",
        {
          user_id: "lokesh",
          message: userMessage
        }
      );

      setChat([
        ...updatedChat,
        {
          sender: "bot",
          text: res.data.response
        }
      ]);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to EnggBot. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      id="chatbot"
      className="
      w-full
      max-w-5xl
      mx-auto
      mt-10
      md:mt-20
      px-4
      "
    >
      <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8">

        {/* TITLE */}

        <h1
          className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          font-bold
          hero-title
          text-center
          mb-6
          "
        >
          EnggBot AI Mentor
        </h1>

        {/* CHAT AREA */}

        <div
          className="
          h-[400px]
          md:h-[550px]
          overflow-y-auto
          flex
          flex-col
          gap-3
          md:gap-5
          pr-2
          mb-6
          "
        >
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`
              max-w-[90%]
              md:max-w-[80%]
              p-3
              md:p-4
              rounded-2xl
              whitespace-pre-wrap
              leading-relaxed
              text-sm
              md:text-base
              ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 ml-auto"
                  : "glass mr-auto"
              }
              `}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="glass p-3 md:p-4 rounded-2xl w-fit text-sm md:text-base">
              🤖 EnggBot is thinking...
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* INPUT */}

        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            rows={1}
            placeholder="Ask anything about AI, careers, coding, internships, projects..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
            flex-1
            bg-black/30
            border
            border-white/10
            rounded-xl
            md:rounded-2xl
            p-3
            md:p-4
            outline-none
            resize-none
            text-sm
            md:text-base
            "
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="
            w-full
            sm:w-auto
            bg-gradient-to-r
            from-violet-500
            to-blue-500
            px-6
            py-3
            md:px-8
            rounded-xl
            md:rounded-2xl
            font-semibold
            hover:scale-105
            transition
            disabled:opacity-50
            "
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}