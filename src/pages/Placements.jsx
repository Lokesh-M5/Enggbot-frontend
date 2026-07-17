import { useState } from "react";
import API from "../services/api";

export default function Placements() {

  const [role, setRole] = useState("");
  const [jobType, setJobType] = useState("Internship");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchJobs = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await API.post(
        "/jobs/search",
        {
          role,
          job_type: jobType,
          location
        }
      );

      setResults(res.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to fetch job openings."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto mt-10 px-4">

      <h1 className="text-4xl font-bold mb-8 hero-title">
        Placement Hub
      </h1>

      {/* SEARCH CARD */}

      <div className="glass p-6 rounded-3xl mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Search Job Opportunities
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Role (AI Engineer)"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="
            bg-black/30
            border
            border-white/10
            rounded-xl
            p-3
            "
          />

          <select
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value)
            }
            className="
            bg-black/30
            border
            border-white/10
            rounded-xl
            p-3
            "
          >
            <option>Internship</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Remote</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="
            bg-black/30
            border
            border-white/10
            rounded-xl
            p-3
            "
          />

        </div>

        <button
          onClick={searchJobs}
          className="
          mt-5
          bg-gradient-to-r
          from-violet-500
          to-blue-500
          px-8
          py-3
          rounded-xl
          font-semibold
          hover:scale-105
          transition
          "
        >
          {loading
            ? "Searching..."
            : "Search Jobs"}
        </button>

      </div>

      {/* ERROR */}

      {error && (

        <div className="text-red-400 mb-5">

          {error}

        </div>

      )}

      {/* JOB RESULTS */}

      {results?.data?.length > 0 && (

        <div className="grid md:grid-cols-2 gap-5">

          {results.data.map(
            (job, index) => (

              <div
                key={index}
                className="
                glass
                p-6
                rounded-3xl
                hover:scale-[1.02]
                transition
                "
              >

                <h3 className="text-xl font-bold mb-2">

                  {job.job_title}

                </h3>

                <p className="text-gray-300">

                  {job.employer_name}

                </p>

                <p className="text-gray-400">

                  {job.job_city ||
                   job.job_country ||
                   "Remote"}

                </p>

                <p className="text-gray-400">

                  {job.job_employment_type}

                </p>

                {job.job_posted_at_datetime_utc && (

                  <p className="text-sm text-gray-500 mt-2">

                    Posted:
                    {" "}
                    {new Date(
                      job.job_posted_at_datetime_utc
                    ).toLocaleDateString()}

                  </p>

                )}

                <a
                  href={
                    job.job_apply_link
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="
                  inline-block
                  mt-4
                  bg-gradient-to-r
                  from-violet-500
                  to-blue-500
                  px-5
                  py-2
                  rounded-xl
                  font-semibold
                  hover:scale-105
                  transition
                  "
                >

                  Apply Now

                </a>

              </div>

            )
          )}

        </div>

      )}

      {/* NO RESULTS */}

      {results &&
        results?.data?.length === 0 && (

        <div className="glass p-6 rounded-3xl text-center">

          No jobs found for your search.

        </div>

      )}

    </div>

  );

}