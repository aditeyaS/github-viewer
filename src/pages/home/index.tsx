import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import ForkIcon from "../../icons/ForkIcon";
import StarIcon from "../../icons/StarIcon";
import GithubIcon from "../../icons/GithubIcon";
import IssuesIcon from "../../icons/IssuesIcon";
import AppLogo from "../../assets/AppLogo";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const onLoadData = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username) {
      navigate(`/${username}`, { replace: true });
    }
  };
  return (
    <div className="h-full w-full fixed flex justify-center items-center bg-base-100">
      <div className="flex flex-col items-center gap-5">
        <AppLogo type="home" />
        <label className="input input-bordered input-accent flex items-center">
          www.github.com/
          <input
            type="text"
            autoFocus
            className="grow"
            placeholder="aditeyaS"
            onKeyDown={(e) => onLoadData(e)}
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          {username && <kbd className="kbd kbd-xs">return</kbd>}
        </label>
        <div className="flex gap-2">
          <div className="border border-accent px-2 py-1 flex gap-2 text-accent">
            <StarIcon />5 starts
          </div>
          <div className="border border-accent px-2 py-1 flex gap-2 text-accent">
            <ForkIcon />2 forks
          </div>
          <div className="border border-accent px-2 py-1 flex gap-2 text-accent">
            <IssuesIcon />2 issues
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-circle">
            <GithubIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
