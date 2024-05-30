import React, { useCallback, useEffect, useState } from "react";
import { RepositoryModel } from "../../../model/RepositoryModel";
import StarIcon from "../../../icons/StarIcon";
import IssuesIcon from "../../../icons/IssuesIcon";
import ForkIcon from "../../../icons/ForkIcon";
import api from "../../../api/api";
import { PieChart } from "react-minimal-pie-chart";
import { BaseDataEntry } from "react-minimal-pie-chart/types/commonTypes";
import getLanguageColor from "../../../utils/getLanguageColor";

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
  const [chartData, setChartData] = useState<BaseDataEntry[]>([]);
  const [chartHoverIndex, setChartHoverIndex] = useState<number>(-1);
  const [stats, setStats] = useState({
    stars: 0,
    issues: 0,
    forks: 0,
  });
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
    let stars = 0;
    let issues = 0;
    let forks = 0;
    const languageMap = new Map<string, number>();
    reposResponseData.forEach((e) => {
      stars += e.stargazers_count;
      issues += e.open_issues_count;
      forks += e.forks_count;
      const lang = e.language || "Other";
      const prev = languageMap.get(lang) || 0;
      languageMap.set(lang, prev + 1);
    });
    const data: BaseDataEntry[] = [];
    let i = 0;
    for (const [language, freq] of languageMap) {
      data.push({
        title: language,
        value: freq,
        color: getLanguageColor(language),
        key: language,
      });
      i = i + 1;
    }
    setChartData(data);
    setStats({ stars, issues, forks });
    setRepositories(reposResponseData);
  }, [username, type, sort, direction, perPage, page]);

  useEffect(() => {
    loadRepoData();
  }, [loadRepoData]);

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body gap-5">
        <div className="flex justify-between">
          <span className="font-bold text-secondary text-lg">Repositories</span>
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
          {repoitories.map((repo, repoIndex) => (
            <div key={repoIndex} className="card bg-base-300">
              <div className="card-body gap-2">
                <span className="text-lg text-primary">{repo.name}</span>
                <span>{repo.description}</span>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="badge badge-xs ring ring-1"
                      style={{ background: getLanguageColor(repo.language) }}
                    ></div>
                    <span>{repo.language ? repo.language : "Other"}</span>
                  </div>
                  <span>{repo.updated_at.substring(0, 10)}</span>
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
        <div className="flex justify-center">
          <PieChart
            className="h-60 w-60 fill-base-content"
            data={chartData}
            lineWidth={50}
            animate={true}
            animationDuration={3000}
            onMouseOver={(_, idx) => {
              setChartHoverIndex(idx);
            }}
            onMouseOut={() => {
              setChartHoverIndex(-1);
            }}
          />
          <div className="flex flex-col gap-3 justify-center ml-10">
            {chartData.map((data, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-2 py-1 rounded border  ${
                  idx === chartHoverIndex ? "border-primary" : "border-base-100"
                }`}
              >
                <div
                  className="badge badge-xs ring ring-1"
                  style={{ background: data.color }}
                ></div>
                <span>{data.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <StarIcon />
            {stats.stars}
          </div>
          <div className="flex items-center gap-2">
            <IssuesIcon />
            {stats.issues}
          </div>
          <div className="flex items-center gap-2">
            <ForkIcon />
            {stats.forks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
