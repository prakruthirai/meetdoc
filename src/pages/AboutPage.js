import React from "react";
import { Link } from "react-router-dom";
import { Card, CardGroup } from "react-bootstrap"; // Importing Card and CardGroup components from react-bootstrap
// Importing Card and Button components from react-bootstrap
import "./aboutpage.css";

const AboutPage = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <div className="about">
        <h1>About Us</h1>
      </div>
      <nav id="navbar-example2" class="navbar  px-3" style={{ backgroundColor: ' #0b4888' }}>
        <a class="navbar-brand" href="#"></a>
        <ul class="nav nav-pills me-auto ">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#scrollspyHeading1"
              style={{ color: "white" }}
            >
              MeetDoc
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#scrollspyHeading2"
              style={{ color: "white" }}
            >
              Transcript
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#scrollspyHeading3"
              style={{ color: "white" }}
            >
              Summary
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#scrollspyHeading4"
              style={{ color: "white" }}
            >
              Minutes of Meeting(MOM)
            </a>
          </li>
        </ul>
        <Link to="/login" style={{ color: "white", marginLeft: "20px" }}>
          <button className="btn btn-primary">Login</button>
        </Link>
      </nav>
      <br />
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        class="scrollspy-example"
        tabindex="0"
        style={{ marginLeft: "20px" }}
      >
        
        <h4 id="scrollspyHeading1">MeetDoc</h4>
        <p className="paragraph">
          Welcome to MeetDoc, the ideal option for seamless meeting
          documentation! Our software includes powerful features that help to
          streamline the entire process. Administrators may add new users,
          creating a seamless onboarding process. Users can submit recorded
          audio files and provide essential information such as the title,
          number of attendees, and a brief description. The Meeting Card page
          lets you quickly view important information such as the title, number
          of attendees, upload date and time, and description. Our powerful
          models create accurate transcripts, short summaries, and thorough
          meeting minutes (MOM) from your audio files. With a single click of
          the 'view' button, you can access specialized pages for transcripts,
          summaries, and MOMs, where you can update and save documents to ensure
          they are always accurate and up to current. MeetDoc is intended to
          make meeting documentation more efficient and organized, allowing you
          to focus on what is truly important. MeetDoc makes meeting management
          simple and efficient.
        </p>
        <div className="container">
         <div className="text">
          <img className="img" src="transcript.png" alt="Transcript"/>
         <h4 id="scrollspyHeading2">Transcript</h4>
         <p >
          In MeetDoc, your meeting recordings are easily converted into complete
          transcripts. Our powerful processing system reliably recognizes user
          voices and collects statements from many participants, ensuring that
          every detail is captured efficiently. The resulting transcript is
          precise and clear, providing a thorough record of your sessions that
          is easy to reference and study. MeetDoc allows you to view and
          navigate your meeting transcripts easily.
        </p>

         </div>
          
        </div>
        <div className="container">
         <div className="text">
          <img className="imgage" src="summary.png" alt="Transcript"/>
         <h4 id="scrollspyHeading3">Summary</h4>
         <p >
         MeetDoc's summary tool converts transcripts into succinct summaries
          that capture the substance of your sessions. The created summary
          provides a rapid overview of the essential topics and conversations,
          ensuring everyone knows the most significant details. MeetDoc's
          meeting summaries help you stay informed and efficient.
        </p>

         </div>
          
        </div>
        <div className="container">
         <div className="text">
          <img className="img" src="mom.png" alt="Transcript"/>
         <h4 id="scrollspyHeading4">Minutes of Meeting(MOM)</h4>
         <p >
         MeetDoc's minutes of meeting (MOM) generator analyses the transcript
          to identify significant discussion points. It retrieves information on
          participants, action items, follow-up activities, and meeting
          decisions. This comprehensive MOM ensures that all essential details
          are recorded, keeping everyone informed and accountable. MeetDoc's MOM
          generator provides organized and effective meeting documentation.
        </p>

         </div>
          
        </div>
        {/* <h4 id="scrollspyHeading2">Transcript</h4>
        <p className="paragraph">
          In MeetDoc, your meeting recordings are easily converted into complete
          transcripts. Our powerful processing system reliably recognizes user
          voices and collects statements from many participants, ensuring that
          every detail is captured efficiently. The resulting transcript is
          precise and clear, providing a thorough record of your sessions that
          is easy to reference and study. MeetDoc allows you to view and
          navigate your meeting transcripts easily.
        </p> */}
        {/* <h4 id="scrollspyHeading3">Summary</h4>
        <p className="paragraph">
          MeetDoc's summary tool converts transcripts into succinct summaries
          that capture the substance of your sessions. The created summary
          provides a rapid overview of the essential topics and conversations,
          ensuring everyone knows the most significant details. MeetDoc's
          meeting summaries help you stay informed and efficient.
        </p> */}
        {/* <h4 id="scrollspyHeading4">Minutes of Meeting(MOM)</h4>
        <p className="paragraph">
          MeetDoc's minutes of meeting (MOM) generator analyses the transcript
          to identify significant discussion points. It retrieves information on
          participants, action items, follow-up activities, and meeting
          decisions. This comprehensive MOM ensures that all essential details
          are recorded, keeping everyone informed and accountable. MeetDoc's MOM
          generator provides organized and effective meeting documentation.
        </p> */}
      </div>
    </div>
  );
};

export default AboutPage;
