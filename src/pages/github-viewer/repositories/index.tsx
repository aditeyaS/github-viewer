import React, { useState } from "react";
import { RepositoryModel } from "../../../model/RepositoryModel";
import StarIcon from "../../../icons/StarIcon";
import IssuesIcon from "../../../icons/IssuesIcon";
import ForkIcon from "../../../icons/ForkIcon";

interface RepositoriesProps {
  repos: RepositoryModel[];
}

const Repositories: React.FC<RepositoriesProps> = ({ repos }) => {
  const sortOptions = [
    { key: "full_name", value: "Full name" },
    { key: "created", value: "Created" },
    { key: "updated", value: "Updated" },
    { key: "pushed", value: "Pushed" },
  ];
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const onChangeSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="flex justify-between">
          <span className="font-bold">Repositories</span>
          <div className="flex gap-2">
            <select className="select select-xs select-bordered w-full max-w-xs">
              <option disabled>Type</option>
              <option>All</option>
              <option>Owner</option>
              <option>Member</option>
            </select>
            <select className="select select-xs select-bordered w-full max-w-xs">
              <option disabled>Sort by</option>
              {sortOptions.map((option) => (
                <option key={option.key} selected={option.key === "updated"}>
                  {option.value}
                </option>
              ))}
            </select>
            <select className="select select-xs select-bordered w-full max-w-xs">
              <option disabled>Items per page</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
            <div className="join">
              <button className="join-item btn btn-xs">«</button>
              <button className="join-item btn btn-xs">1</button>
              <button className="join-item btn btn-xs">»</button>
            </div>
            <button onClick={onChangeSortOrder} className="btn btn-xs">
              {sortOrder === "asc" ? "Z-A" : "A-Z"}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {repos.map((repo) => (
            <div className="card bg-base-300">
              <div className="card-body gap-2">
                <span className="font-bold text-lg">{repo.name}</span>
                <span>{repo.description}</span>
                <div>
                  <span className="bg-primary px-2 py-1 rounded text-primary-content">
                    {repo.language ? repo.language : "Unknown"}
                  </span>
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
