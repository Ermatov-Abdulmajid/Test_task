import React from "react";
import CompanyDetails from "./CompanyDetails";
import Contacts from "./Contacts";
import Photos from "./Photos";
import DialogButtons from "./DialogButtons";

const OrganizationCard = ({ company, contact, setCompany }) => {
  return (
    <div className="organization-card">
      <h2>{company.name}</h2>
      <CompanyDetails company={company} setCompany={setCompany} />
      <Contacts contact={contact} />
      <Photos
        photos={company.photos}
        companyId={company.id}
        setCompany={setCompany}
      />
      <DialogButtons companyId={company.id} />
    </div>
  );
};

export default OrganizationCard;
