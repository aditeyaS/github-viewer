import { useParams } from "react-router-dom";
import AboutCard from "./about-card";
import Topbar from "./topbar";
import { useEffect } from "react";

const GithubViewer = () => {
  const { username } = useParams();

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <div className="h-screen w-screen bg-base-300 p-10 flex flex-col gap-10">
      <Topbar />
      <AboutCard />
    </div>
  );
};

export default GithubViewer;
