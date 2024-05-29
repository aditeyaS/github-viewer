import React, { useCallback, useEffect, useState } from "react";
import { RepositoryModel } from "../../../model/RepositoryModel";
import StarIcon from "../../../icons/StarIcon";
import IssuesIcon from "../../../icons/IssuesIcon";
import ForkIcon from "../../../icons/ForkIcon";
import api from "../../../api/api";

const typeOptions = [
  { key: "all", value: "All" },
  { key: "owner", value: "Owner" },
  { key: "member", value: "Member" },
];

const sortOptions = [
  { key: "full_name", value: "Full name" },
  { key: "created", value: "Created" },
  { key: "updated", value: "Updated" },
  { key: "pushed", value: "Pushed" },
];

const perPageOptions = ["5", "10", "15", "20"];

interface RepositoriesProps {
  username: string;
}

const Repositories: React.FC<RepositoriesProps> = ({ username }) => {
  const [repoitories, setRepositories] = useState<RepositoryModel[]>([]);
  const [type, setType] = useState<string>("owner");
  const [sort, setSort] = useState<string>("updated");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [perPage, setPerPage] = useState<string>("5");
  const [page, setPage] = useState<number>(1);
  const [pagesRemaining, setPagesRemaining] = useState(false);

  const onChangeDirection = () => {
    setDirection(direction === "asc" ? "desc" : "asc");
  };

  const loadRepoData = useCallback(async () => {
    const reposResponse = await api.get(
      `users/${username}/repos?type=${type}&sort=${sort}&direction=${direction}&per_page=${perPage}&page=${page}`
    );
    // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
    const reposResponseData: RepositoryModel[] = reposResponse.data;
    if (
      reposResponse.headers.link &&
      reposResponse.headers.link.includes(`rel="next"`)
    ) {
      setPagesRemaining(true);
    } else {
      setPagesRemaining(false);
    }
    setRepositories(reposResponseData);
  }, [username, type, sort, direction, perPage, page]);

  useEffect(() => {
    loadRepoData();
  }, [loadRepoData]);

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="flex justify-between">
          <span className="font-bold">Repositories</span>
          <div className="flex gap-2">
            <select
              className="select select-xs select-bordered select-accent w-full max-w-xs"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option disabled>Type</option>
              {typeOptions.map((option) => (
                <option
                  key={option.key}
                  disabled={option.key === type}
                  selected={option.key === type}
                  value={option.key}
                >
                  {option.value}
                </option>
              ))}
            </select>
            <select
              className="select select-xs select-bordered select-accent w-full max-w-xs"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option disabled>Sort by</option>
              {sortOptions.map((option) => (
                <option
                  key={option.key}
                  disabled={option.key === sort}
                  selected={option.key === sort}
                  value={option.key}
                >
                  {option.value}
                </option>
              ))}
            </select>
            <select
              className="select select-xs select-bordered select-accent w-full max-w-xs"
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
            >
              <option disabled>Items</option>
              {perPageOptions.map((option) => (
                <option
                  key={option}
                  disabled={option === perPage}
                  selected={option === perPage}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
            <div className="join">
              <button
                disabled={page === 1}
                className="join-item btn btn-xs btn-accent"
                onClick={() => setPage(page - 1)}
              >
                {`<`}
              </button>
              <button className="join-item btn btn-xs">{page}</button>
              <button
                disabled={!pagesRemaining}
                className="join-item btn btn-xs btn-accent"
                onClick={() => setPage(page + 1)}
              >{`>`}</button>
            </div>
            <button
              onClick={onChangeDirection}
              className="btn btn-xs btn-accent"
            >
              {direction === "asc" ? "Z-A" : "A-Z"}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {repoitories.map((repo) => (
            <div className="card bg-base-300">
              <div className="card-body gap-2">
                <span className="font-bold text-lg">{repo.name}</span>
                <span>{repo.description}</span>
                <div className="flex items-center gap-2">
                  <div
                    className="badge badge-xs ring ring-1 ring-base-content"
                    style={{ background: "red" }}
                    // get github language color
                  ></div>

                  <span>{repo.language ? repo.language : "Other"}</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <StarIcon />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <IssuesIcon />
                    {repo.open_issues_count}
                  </div>
                  <div className="flex items-center">
                    <ForkIcon />
                    {repo.forks_count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Repositories;
