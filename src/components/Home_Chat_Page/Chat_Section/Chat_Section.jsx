import React, { useEffect, useRef, useState } from "react";
import { Flex, message } from "antd";
import "./Chat_Section.css";
import { SwapRightOutlined } from "@ant-design/icons";

const Chat_Section = ({ selectedMail }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [msgInput, setMsgInput] = useState("");
  const [dummyChatHistory, setDummyChatHistory] = useState([
    {
      message_id: 0,
      sender_email: "2@gmail.com",
      reciever_email: "sonupoonia85728@gmail.com",
      sent_timestamp: new Date(),
      read: "2", // 0: sent, 1: recieved, 2: readed
      message: "hi",
    },
    {
      message_id: 1,
      sender_email: "sonupoonia85728@gmail.com",
      reciever_email: "2@gmail.com",
      sent_timestamp: new Date(),
      read: "0", // 0: sent, 1: recieved, 2: readed
      message: "hello",
    },
    {
      message_id: 2,
      sender_email: "2@gmail.com",
      reciever_email: "sonupoonia85728@gmail.com",
      sent_timestamp: new Date(),
      read: "2", // 0: sent, 1: recieved, 2: readed
      message: "how are you",
    },
    {
      message_id: 3,
      sender_email: "sonupoonia85728@gmail.com",
      reciever_email: "2@gmail.com",
      sent_timestamp: new Date(),
      read: "1", // 0: sent, 1: recieved, 2: readed
      message: "i am fine",
    },
    {
      message_id: 3,
      sender_email: "2@gmail.com",
      reciever_email: "sonupoonia85728@gmail.com",
      sent_timestamp: new Date(),
      read: "2", // 0: sent, 1: recieved, 2: readed
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt doloremque possimus harum architecto porro inventore magni repellat exercitationem tempore mollitia id nulla eveniet laudantium nihil voluptate at, nostrum quasi rem.",
    },
    {
      message_id: 3,
      sender_email: "sonupoonia85728@gmail.com",
      reciever_email: "2@gmail.com",
      sent_timestamp: new Date(),
      read: "2", // 0: sent, 1: recieved, 2: readed
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt doloremque possimus harum architecto porro inventore magni repellat exercitationem tempore mollitia id nulla eveniet laudantium nihil voluptate at, nostrum quasi rem.",
    },
  ]);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [dummyChatHistory]);

  const sendMessage = () => {
    const message = msgInput?.trim();
    if (!message) {
      messageApi.open({
        type: "error",
        content: "No message found, Please write something!",
      });
    } else {
      messageApi.open({
        type: "success",
        content: `${message} message sent to: ${selectedMail}`,
      });
      setDummyChatHistory((prev) => [
        ...prev,
        {
          message_id: dummyChatHistory.length,
          sender_email: "sonupoonia85728@gmail.com",
          reciever_email: selectedMail,
          sent_timestamp: new Date(),
          read: "2", // 0: sent, 1: recieved, 2: readed
          message,
        },
      ]);
      setMsgInput("");
    }
  };

  return (
    <>
      {contextHolder}
      {/* Middle Section {selectedMail} */}

      <div
        id="chat_section"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {selectedMail ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flexGrow: 1,
            }}
          >
            {/* Header of chat - email avatar, email, three dots */}

            <div
              className="selected_email"
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "10px",
                borderBottom: "1px solid",
              }}
            >
              <div className="selected_email_avatar noGreenBg">
                <span>{selectedMail?.charAt(0)}</span>
              </div>
              <div key={selectedMail} className="selected_emailName">
                {selectedMail?.length > 20
                  ? `${selectedMail?.substring(0, 25)}...`
                  : selectedMail}
              </div>
            </div>

            {/* Chat History */}
            <div
              style={{
                flexGrow: "1",
                overflowY: "auto",
                maxHeight: "590px",
                padding: "0px 5px",
              }}
              id="chating_history"
              ref={chatRef}
            >
              {dummyChatHistory.map((messageData) => (
                <>
                  <div
                    className="single_chatMsg"
                    style={{
                      display: "flex",
                      flexDirection: "column-reverse",
                      paddingLeft:
                        messageData?.reciever_email === selectedMail && "20%",
                      paddingRight:
                        messageData?.reciever_email !== selectedMail && "20%",
                      flexDirection:
                        messageData?.reciever_email === selectedMail &&
                        "row-reverse",
                    }}
                  >
                    {/* <span>{messageData?.sent_timestamp?.toDateString()}</span> */}
                    <span
                      className={
                        messageData?.reciever_email !== selectedMail
                          ? "greenBgButton"
                          : "noGreenBg"
                      }
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                      }}
                    >
                      {messageData?.reciever_email === selectedMail && (
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
                          <SwapRightOutlined
                            style={{
                              color:
                                messageData?.read === "2"
                                  ? "#25d366"
                                  : messageData?.read === "1"
                                  ? "black"
                                  : "gray",
                              fontSize: "large",
                              transform: "rotate(-60deg) scaleX(-1)",
                            }}
                          />
                        </span>
                      )}
                      <span style={{ wordBreak: "break-all" }}>
                        {messageData?.message}
                      </span>
                    </span>
                  </div>
                </>
              ))}
            </div>

            {/* Enter text & send */}
            {/* <div style={{}}>Enter message & send</div> */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <input
                type="text"
                id="msg_input"
                placeholder="What's in your mind!"
                value={msgInput}
                onChange={(e) => setMsgInput(e?.target?.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <div className="greenBgButton" onClick={sendMessage}>
                Send
              </div>
            </div>
          </div>
        ) : (
          <>Welcome To ChatMail.Com - Let's Chat Buddy!</>
        )}

        {/* chat history */}

        {/* input and send text */}
      </div>
    </>
  );
};

export default Chat_Section;
