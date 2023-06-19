import React, { useState, useEffect } from "react";
import axios from "axios";
import JobDetail from './jobdetail';

function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortedBy, setSortedBy] = useState("");
  const [expandedCards, setExpandedCards] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

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

  const toggleCardExpansion = (id) => {
    setExpandedCards((prevExpandedCards) =>
      prevExpandedCards.includes(id)
        ? prevExpandedCards.filter((cardId) => cardId !== id)
        : [...prevExpandedCards, id]
    );
  };

  const isCardExpanded = (id) => {
    return expandedCards.includes(id);
  };

  const handleJobDetail = (jobId) => {
    // Handle the job detail logic here
  };

  const filterByCategory = (category) => {
    setSearchKeyword("");
    setFilteredCategories(
      jobs.filter((job) => {
        const jobCategory = job.role.toLowerCase();
        return (
          (category === "python" && (jobCategory.includes("python") || jobCategory.includes("django"))) ||
          (category === "react" && jobCategory.includes("react")) ||
          (category === "javascript" && jobCategory.includes("javascript")) ||
          (category === "other" && !jobCategory.includes("python") && !jobCategory.includes("django") && !jobCategory.includes("react") && !jobCategory.includes("javascript"))
        );
      })
    );
  };

  const clearFilter = () => {
    setSearchKeyword("");
    setFilteredCategories([]);
  };

  const filteredJobs = filteredCategories.length > 0 ? filteredCategories : jobs.filter((job) =>
    job.role.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    job.employment_type.toLowerCase().includes(searchKeyword.toLowerCase())
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
            className={filteredCategories.length === 0 ? "active" : ""}
            onClick={clearFilter}
          >
            All Jobs
          </button>
          <button
            className={filteredCategories.includes("python") ? "active" : ""}
            onClick={() => filterByCategory("python")}
          >
            Python/Django
          </button>
          <button
            className={filteredCategories.includes("react") ? "active" : ""}
            onClick={() => filterByCategory("react")}
          >
            React
          </button>
          <button
            className={filteredCategories.includes("javascript") ? "active" : ""}
            onClick={() => filterByCategory("javascript")}
          >
            JavaScript
          </button>
          <button
            className={filteredCategories.includes("other") ? "active" : ""}
            onClick={() => filterByCategory("other")}
          >
            Other
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
                <h2><span className="expand-icon">{isCardExpanded(category.id) ? "  ▼" : "  ▶"}</span> {category.company_name}</h2>
                <h3>{category.role}</h3>
              </div>
              {isCardExpanded(category.id) && (
                <div className="card-details">
                  <p>{category.employment_type}</p>
                  <p>{category.date_posted}</p>
                  <p>{category.location}</p>
                  <p>{category.salary}</p>
                  <p>{category.description}</p>
                  <button onClick={() => handleJobDetail(category.id)}>View Job Details</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobSearch;
