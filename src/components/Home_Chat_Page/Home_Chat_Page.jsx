import React, { useState } from "react";
import './Home_Chat_Page.css';
import Email_Section from "./Email_Section/Email_Section";
import Chat_Section from "./Chat_Section/Chat_Section";

const Home_Chat_Page = () => {
    const [selectedMail, setSelectedMail] = useState(null);
  return (
    <>
      <div
        id="allChat_sections"
        style={{
          padding: "2vw 5vw",
          display: "flex",
          justifyContent: "space-between",
          gap: "5%",
        }}
      >
        <div className="home_chat_page_sections" style={{ flex: "1" }}>
          <Email_Section selectedMail={selectedMail} setSelectedMail={setSelectedMail} />
        </div>
        <div className="home_chat_page_sections" style={{ flex: "2" }}>
          <Chat_Section selectedMail={selectedMail} />
        </div>
        <div className="home_chat_page_sections" style={{ flex: "1", overflow: 'hidden' }}>
          Profile Section {selectedMail}
        </div>
      </div>
    </>
  );
};

export default Home_Chat_Page;
