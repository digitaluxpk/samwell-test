import { Children, useState } from "react";

function CommentSection({
  comments,
  setApiData,
  selectedCandidate,
  questionId,
}) {
  const [commentInput, setCommentInput] = useState("");

  return (
    <div className="w-1/2 flex flex-col justify-between">
      <div className="">
        <p className="text-gray-700 font-medium border-b border-b-gray-300 py-2">Comments</p>
        <div className="max-h-[330px] h-auto overflow-y-auto">
          {comments ? (
            Children.toArray(
              comments.map((comment) => (
                <p className="text-gray-700 py-1">{comment}</p>
              ))
            )
          ) : (
            <p className="text-gray-300">No comments yet!</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full px-2 py-1 mt-auto border border-gray-300 rounded-md"
          placeholder="Comment here"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          className="bg-blue-500 px-2 py-1 rounded-md text-white"
          onClick={() => {
            setApiData((pre) => {
              return {
                ...pre,
                applications: pre.applications.map((app) => {
                  if (app.id === selectedCandidate.applocation.id) {
                    return {
                      ...app,
                      videos: app.videos.map((v) => {
                        if (v.questionId === questionId) {
                          return {
                            ...v,
                            comments: [...v.comments, commentInput],
                          };
                        }
                        return v;
                      }),
                    };
                  }
                  return app;
                }),
              };
            });
            setCommentInput("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function UserDetails({
  apiData,
  selectedCandidate,
  setApiData,
}) {
  return (
    <>
      <div className="w-full bg-white p-4 h-screen overflow-y-auto">
        <h1 className="font-bold text-xl py-3 border-b border-b-gray-300">
          {selectedCandidate?.candidate?.name}
        </h1>
        <div className="mt-0">
          {Children.toArray(
            selectedCandidate?.applocation?.videos?.map((video) => (
              <div className="py-3 border-b border-b-gray-100">
                <p className="text-gray-700 font-medium">
                  {
                    apiData.questions.filter(
                      (question) => question.id === video.questionId
                    )[0]?.question
                  }
                </p>
                <div className="flex gap-4 mt-2">
                  <video className="w-1/2 h-[410px]" src={video.src} controls></video>
                  <CommentSection
                    comments={video.comments}
                    questionId={video.questionId}
                    setApiData={setApiData}
                    selectedCandidate={selectedCandidate}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
