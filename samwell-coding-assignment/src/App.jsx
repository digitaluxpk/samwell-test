import { useEffect, useState, Children } from "react";
import UserDetails from "./components/userDetails";

async function getCandidates() {
  const response = await fetch(`http://localhost:3010/candidates`);
  return await response.json();
}

async function getQuestions() {
  const response = await fetch(`http://localhost:3010/questions`);
  return await response.json();
}

async function getApplications() {
  const response = await fetch(`http://localhost:3010/applications`);
  return await response.json();
}

function App() {
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [apiData, setApiData] = useState({
    candidates: [],
    questions: [],
    applications: [],
  });

  useEffect(() => {
    Promise.all([getCandidates(), getQuestions(), getApplications()]).then(
      (data) => {
        let [candidates, questions, applications] = data;
        setApiData({
          candidates,
          questions,
          applications,
        });
      }
    );
  }, []);

  return (
    <>
      <div className="flex">
        <div className="max-w-[300px] w-full bg-white p-4">
          <h1 className="font-bold text-xl py-3 border-b border-b-gray-300">
            Candidates List
          </h1>
          <div className="mt-0">
            {Children.toArray(
              apiData?.candidates?.map((candidate) => (
                <p
                  className="px-2 py-3 border-b border-b-gray-100 hover:bg-blue-50 cursor-pointer text-gray-700"
                  onClick={() => {
                    setSelectedCandidate(candidate);
                  }}
                  style={{
                    backgroundColor:
                      selectedCandidate?.id === candidate.id
                        ? "#e2e8f0"
                        : "",
                  }}
                >
                  {candidate.name}
                </p>
              ))
            )}
          </div>
        </div>
        {selectedCandidate?.id ? (
          <UserDetails
            apiData={apiData}
            setApiData={setApiData}
            selectedCandidate={{
              candidate: selectedCandidate,
              applocation: apiData.applications.filter((application) => {
                if (application.id === selectedCandidate.applicationId) {
                  return application;
                }
              })[0],
            }}
          />
        ) : (
          <div className="w-full bg-white h-screen flex items-center justify-center">
            <p className="text-lg text-gray-500">
              Select a candidate to view details
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
