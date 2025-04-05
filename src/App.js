import React, { useState, useEffect } from "react";
import { authenticate, getCompany, getContact } from "./api";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import OrganizationCard from "./components/OrganizationCard";
import "./App.css";

const App = () => {
  const [company, setCompany] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authenticate("USERNAME");
        const companyData = await getCompany(12);
        const contactData = await getContact(companyData.contactId);
        setCompany(companyData);
        setContact(contactData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        {company && contact && (
          <OrganizationCard
            company={company}
            contact={contact}
            setCompany={setCompany}
          />
        )}
      </div>
    </div>
  );
};

export default App;
