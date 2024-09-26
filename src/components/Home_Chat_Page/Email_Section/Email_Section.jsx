import React from "react";
import "./Email_Section.css";

const Email_Section = ({ selectedMail, setSelectedMail }) => {
  const my_chat_emails = [
    { emailId: "sonupoonia1@gmail.commmmmmmmmmmcommmmmmmmmmm" },
    { emailId: "2@gmail.com" },
    { emailId: "sonupoonia3@gmail.com" },
    { emailId: "sonupoonia4@gmail.com" },
  ];

  return (
    <>
      <div id="email_section">
        {/* Add New Email */}
        <div style={{ textAlign: "center" }} className="greenBgButton">
          Add New Email
        </div>

        {/* All Emails */}
        <div id="all_emails">
          {my_chat_emails.map((mail) => (
            <div
              className="single_email"
              style={{}}
              onClick={() => {
                setSelectedMail(mail?.emailId);
              }}
            >
              <div
                className={
                  selectedMail === mail?.emailId
                    ? "email_avatar greenBgButton"
                    : "email_avatar noGreenBg"
                }
              >
                <span>{mail?.emailId?.charAt(0)}</span>
              </div>
              <div
                key={mail?.emailId}
                className="emailName"
                style={{ color: selectedMail === mail?.emailId && "#25d366" }}
              >
                {mail?.emailId?.length > 20
                  ? `${mail?.emailId?.substring(0, 20)}...`
                  : mail?.emailId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Email_Section;
