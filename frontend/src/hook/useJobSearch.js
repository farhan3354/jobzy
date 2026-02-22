import { useState, useEffect, useMemo } from "react";
import { translateSearchTerm } from "../utils/translationUtils";

export const useJobSearch = (jobs, language) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [translatedSearchTerm, setTranslatedSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Debounce search term to optimize translations and filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Translate search term if language is Arabic
  useEffect(() => {
    const translate = async () => {
      if (language === "ar" && debouncedSearchTerm) {
        const translated = await translateSearchTerm(debouncedSearchTerm, "en");
        setTranslatedSearchTerm(translated);
      } else {
        setTranslatedSearchTerm("");
      }
    };
    translate();
  }, [debouncedSearchTerm, language]);

  // Combined filtering logic
  useEffect(() => {
    let results = jobs.filter(
      (job) => job.status !== "Closed" && job.status !== "Inactive"
    );

    if (debouncedSearchTerm) {
      const lowerSearch = debouncedSearchTerm.toLowerCase();
      const lowerTranslatedSearch = translatedSearchTerm.toLowerCase();

      const translatedKeywords = lowerTranslatedSearch
        .split(/\s+/)
        .filter((word) => word.length > 2);

      results = results.filter((job) => {
        const title = job.jobTitle.toLowerCase();
        const company = job.companyName.toLowerCase();
        const skills = job.skills.map((s) => s.toLowerCase());

        const isMatch =
          title.includes(lowerSearch) ||
          company.includes(lowerSearch) ||
          skills.some((skill) => skill.includes(lowerSearch));

        if (isMatch) return true;

        if (translatedSearchTerm) {
          if (
            title.includes(lowerTranslatedSearch) ||
            company.includes(lowerTranslatedSearch) ||
            skills.some((skill) => skill.includes(lowerTranslatedSearch))
          ) {
            return true;
          }

          if (translatedKeywords.length > 0) {
            return translatedKeywords.some(
              (keyword) =>
                title.includes(keyword) ||
                company.includes(keyword) ||
                skills.some((skill) => skill.includes(keyword))
            );
          }
        }
        return false;
      });
    }

    if (locationFilter) {
      results = results.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      const today = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "last24h":
          filterDate.setDate(today.getDate() - 1);
          break;
        case "last3days":
          filterDate.setDate(today.getDate() - 3);
          break;
        case "lastWeek":
          filterDate.setDate(today.getDate() - 7);
          break;
        case "lastMonth":
          filterDate.setMonth(today.getMonth() - 1);
          break;
        default:
          break;
      }
      results = results.filter((job) => new Date(job.createdAt) >= filterDate);
    }

    setFilteredJobs(results);

    // Sync selected job
    if (results.length > 0) {
      if (!selectedJob || !results.find((j) => j._id === selectedJob._id)) {
        setSelectedJob(results[0]);
      }
    } else {
      setSelectedJob(null);
    }
  }, [debouncedSearchTerm, translatedSearchTerm, locationFilter, dateFilter, jobs, selectedJob]);

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setDateFilter("");
  };

  return {
    searchTerm,
    setSearchTerm,
    locationFilter,
    setLocationFilter,
    dateFilter,
    setDateFilter,
    filteredJobs,
    selectedJob,
    setSelectedJob,
    clearFilters,
  };
};
