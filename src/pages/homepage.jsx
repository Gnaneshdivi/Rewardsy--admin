import React, { useState } from "react";
import "./homepage.css";
import Form from "./on-board"; // Onboarding form component
import Content from "./content"; // Content form component
import Offer from "./offers"; // Offer form component

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("onboarding");

  return (
    <div className="admin-container">
      <div className="sidebar">
        <button onClick={() => setActiveTab("onboarding")}>On-Boarding</button>
        <button onClick={() => setActiveTab("content")}>Content</button>
        <button onClick={() => setActiveTab("offers")}>Offers</button>
      </div>

      <div className="content">
        {activeTab === "onboarding" && <Form title="On-Boarding Form" />}
        {activeTab === "content" && <Content title="Content Form" />}
        {activeTab === "offers" && <Offer title="Offers Form" />}
      </div>
    </div>
  );
};

export default Homepage;
