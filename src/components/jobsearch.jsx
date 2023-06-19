import React, { useState, useEffect } from "react";
import axios from "axios";
import JobDetail from './jobdetail';

function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortedBy, setSortedBy] = useState("");
  const [expandedCards, setExpandedCards] = useState([]);
  const [jobDetail, setJobDetail] = useState('');

  useEffect(() => {
    axios
      .get("https://proxy-findwork-api.glitch.me/api/jobs/", {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_FINDWORK_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setJobs(response.data.results));
  }, []);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSortBy = (sortBy) => {
    setSortedBy(sortBy);
  };


//   this is what you use to change what the state is 
  const toggleCardExpansion = (id) => {
    setExpandedCards((prevExpandedCards) =>
      prevExpandedCards.includes(id)
        ? prevExpandedCards.filter((cardId) => cardId !== id)
        : [...prevExpandedCards, id]
    );
  };

//   for referencing the state
  const isCardExpanded = (id) => {
    return expandedCards.includes(id);
  };


  const filteredJobs = jobs.filter((job) =>
    job.role.toLowerCase().includes(searchKeyword.toLowerCase()) || job.employment_type.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  const sortedCategories = filteredJobs.sort((a, b) => {
    if (sortedBy === "company_name") {
      return a.company_name.localeCompare(b.company_name);
    } else if (sortedBy === "role") {
      return a.role.localeCompare(b.role);
    } else if (sortedBy === "employment_type") {
      return a.employment_type > b.employment_type ? 1 : -1;
    } else {
      return a.date_posted.localeCompare(b.date_posted);
    }
  });

  const handleJobDetail = (jobId) => {
    history.push(`/job/${jobId}`);
  };

  
  return (
    <div>
      <div className="jobCard">
        <h1>Job Categories</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={handleSearch}
        />
        <div className="navigation">
          <button
            className={sortedBy === "company_name" ? "active" : ""}
            onClick={() => handleSortBy("company_name")}
          >
            Company Name
          </button>
          <button
            className={sortedBy === "role" ? "active" : ""}
            onClick={() => handleSortBy("role")}
          >
            Role
          </button>
          <button
            className={sortedBy === "employment_type" ? "active" : ""}
            onClick={() => handleSortBy("employment_type")}
          >
            Employment Type
          </button>
          <button
            className={sortedBy === "date_posted" ? "active" : ""}
            onClick={() => handleSortBy("date_posted")}
          >
            Date Posted
          </button>
        </div>
      </div>

      <div>
        {sortedCategories.map((category) => (
          <div className="job" key={category.id}>
            <div
              className={`job-card ${isCardExpanded(category.id) ? "expanded" : ""}`}
              onClick={() => toggleCardExpansion(category.id)}
            >
              <div className="card-header">
              <h2><span className="expand-icon">{isCardExpanded(category.id) ? "  ▼" : "  ▶"}</span>                 {category.company_name}</h2>
              <h3> {category.role}</h3>
              </div>
              {isCardExpanded(category.id) ? (
                <div className="card-details">
                  
                  <p>{category.employment_type}</p>
                  <p>{category.date_posted}</p>
                  <p>{category.location}</p>
                  <p>{category.salary}</p>
                  <p>{category.description}</p>
                  <button onClick={() => handleJobDetail(category.id)}>View Job Details</button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobSearch;
