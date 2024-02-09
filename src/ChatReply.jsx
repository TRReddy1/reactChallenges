import React, { useState } from "react";
import { v4 } from "uuid";

const ChatReply = ({ id }) => {
  const [chat, setChats] = useState([]);
  return (
    <div>
      {chat.map((ch) => {
        return <ChatReply id={ch.id} />;
      })}
      <div>
        {chat.length === 0 ? (
          "Ravindra Reddy"
        ) : (
          <input
            type="text"
            value={chat[0].name}
            onChange={() =>
              setChats(
                chat.map((c) => {
                  if (c.id === id) {
                    return {
                      ...c,
                      name: e.target.value,
                    };
                  }
                  return c;
                })
              )
            }
          />
        )}
      </div>
      <div>Hello, world</div>
      <button
        onClick={() =>
          setChats((old) => [...old, { id: v4(), name: "", text: "" }])
        }
      >
        reply
      </button>
      <button>edit</button>
      <button>delete</button>
    </div>
  );
};

export default ChatReply;
