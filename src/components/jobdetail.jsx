import React from "react";

function JobDetail({ job }) {
  return (
    <div>
      <h2>{job.company_name}</h2>
      <h3>{job.role}</h3>
      <img>{job.logo}</img>
      <p>{job.employment_type}</p>
      <p>{job.date_posted}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.description}</p>
    </div>
  );
}

export default JobDetail;
