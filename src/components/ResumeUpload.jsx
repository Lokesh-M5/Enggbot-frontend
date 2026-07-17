import { useState } from "react";
import API from "../services/api";

export default function ResumeUpload() {

  const [file, setFile] =
    useState(null);

  const [result, setResult] =
    useState("");

  const uploadResume =
    async () => {

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const res =
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

      setResult(
        JSON.stringify(
          res.data,
          null,
          2
        )
      );
    };

  return (

    <div className="glass p-6 rounded-3xl">

      <h2 className="text-2xl font-bold mb-4">

        Resume Upload

      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e)=>

          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={uploadResume}
        className="
        mt-4
        bg-gradient-to-r
        from-violet-500
        to-blue-500
        px-5
        py-2
        rounded-xl
        "
      >

        Upload Resume

      </button>

      {result && (

        <pre className="mt-4">

          {result}

        </pre>

      )}

    </div>

  );
}