import { useState, KeyboardEvent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForkIcon from "../../icons/ForkIcon";
import StarIcon from "../../icons/StarIcon";
import GithubIcon from "../../icons/GithubIcon";
import IssuesIcon from "../../icons/IssuesIcon";
import AppLogo from "../../assets/AppLogo";
import api from "../../api/api";
import { RepositoryModel } from "../../model/RepositoryModel";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [repoData, setRepoData] = useState<RepositoryModel>();
  const onSearchUser = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username) {
      navigate(`/${username}`, { replace: true });
    }
  };

  const onOpenGitHub = () => {
    window.open("https://github.com/aditeyaS/github-viewer", "_blank");
  };

  const loadData = useCallback(async () => {
    const response = await api.get("repos/aditeyaS/github-viewer");
    setRepoData(response.data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
            onKeyDown={(e) => onSearchUser(e)}
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          {username && <kbd className="kbd kbd-xs">return</kbd>}
        </label>
        {repoData && (
          <div className="flex gap-2">
            <div className="border border-accent px-2 py-1 flex gap-2 text-accent items-center">
              <StarIcon />
              {repoData.stargazers_count} starts
            </div>
            <div className="border border-accent px-2 py-1 flex gap-2 text-accent items-center">
              <ForkIcon />
              {repoData.forks_count} forks
            </div>
            <div className="border border-accent px-2 py-1 flex gap-2 text-accent items-center">
              <IssuesIcon />
              {repoData.open_issues_count} issues
            </div>
          </div>
        )}
        {repoData && (
          <span>Last updated: {repoData.updated_at.slice(0, 10)}</span>
        )}
        <div className="flex gap-2">
          <button className="btn btn-circle" onClick={onOpenGitHub}>
            <GithubIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
