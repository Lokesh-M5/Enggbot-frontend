import { useState } from "react";
import API from "../services/api";

export default function ATSScanner() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const scanResume = async () => {

    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const uploadRes =
        await API.post(

          "/pdf/upload",

          formData,

          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      const resumeText =
        uploadRes.data.resume_text;

      const atsRes =
        await API.post(

          "/ats/check",

          {
            resume_text:
              resumeText
          }

        );

      setResult(
        atsRes.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to scan resume"
      );

    } finally {

      setLoading(false);

    }
  };

  const getScoreColor =
    (score) => {

      if (score >= 80)
        return "text-green-400";

      if (score >= 50)
        return "text-yellow-400";

      return "text-red-400";
    };

  return (

    <div className="grid md:grid-cols-2 gap-8">

      {/* Upload Card */}

      <div className="glass p-8 rounded-[40px]">

        <h2 className="text-4xl font-bold text-center mb-10">

          ATS Scanner

        </h2>

        <div className="flex flex-col items-center gap-6">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          {file && (

            <p className="text-gray-300">

              {file.name}

            </p>

          )}

          <button

            onClick={scanResume}

            disabled={loading}

            className="
            bg-gradient-to-r
            from-blue-500
            to-cyan-500
            px-8
            py-3
            rounded-2xl
            font-semibold
            hover:scale-105
            transition
            "

          >

            {
              loading
                ? "Scanning..."
                : "Scan Resume"
            }

          </button>

        </div>

      </div>

      {/* Results Card */}

      <div className="glass p-8 rounded-[40px]">

        <h2 className="text-2xl font-bold mb-6">

          ATS Results

        </h2>

        {!result ? (

          <div className="text-gray-400">

            Upload a resume to view ATS score.

          </div>

        ) : (

          <>

            <div className="text-center mb-8">

              <h1
                className={`

                text-7xl
                font-bold

                ${getScoreColor(
                  result.ats_score
                )}

                `}
              >

                {result.ats_score}

              </h1>

              <p className="mt-3 text-gray-300">

                ATS Score

              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-4">

                Suggestions

              </h3>

              {

                result.feedback?.length > 0

                  ? (

                    <ul className="space-y-3">

                      {

                        result.feedback.map(

                          (
                            item,
                            index
                          ) => (

                            <li
                              key={index}
                              className="
                              bg-white/5
                              p-3
                              rounded-xl
                              "
                            >

                              ✓ {item}

                            </li>

                          )

                        )

                      }

                    </ul>

                  )

                  : (

                    <div className="text-green-400">

                      Excellent ATS optimization!

                    </div>

                  )

              }

            </div>

          </>

        )}

      </div>

    </div>

  );
}