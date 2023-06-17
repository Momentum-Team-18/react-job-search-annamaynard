import React, { useState, useEffect } from "react";
import axios from "axios";


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
