import React, { useState, useEffect } from "react";
import axios from "axios";

function JobSearch() {
  const [jobCategories, setJobCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    axios
      .get("https://proxy-findwork-api.glitch.me/api/jobs/", {
        headers: {
          Authorization: `Token ${import.meta.env.VITE_FINDWORK_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setJobCategories(response.data.results));
  }, []);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handelJobTitle = () => {
    setJobTitle('./jobtitle')
  }
  const filteredCategories = jobCategories.filter((category) =>
    category.role.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="jobCard">
      <h1>Job Categories</h1>
      <button onClick={handelJobTitle}>{./jobTitle}</button>
      <input 
        type="text"
        placeholder="Search by role, key word, date..."
        value={searchKeyword}
        onChange={handleSearch}
      />
      {filteredCategories.map((category) => (
        <div className="jobs" key={category.id}>
          <h2>{category.company_name}</h2>
          <h3>{category.role}</h3>
          <h4>
            {category.employment_type}/{category.date_posted}
          </h4>
        </div>
      ))}
    </div>

    //   return (
    //     <div className="jobCard">
    //       <h1>Job Categories</h1>

    //       {jobCategories.map((category) => (
    //         <div key={category.id}>
    //           <h2>{category.company_name}</h2>
    //           <h3>{category.role}</h3>
    //           <h4>{category.employment_type}/{category.date_posted}</h4>
    //         </div>
    //       ))}
    //     </div>
  );
}

export default JobSearch;
