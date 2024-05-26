import React from "react";

interface StatsProps {
  followers: number;
  following: number;
  repositories: number;
  gists: number;
}

const Stats: React.FC<StatsProps> = ({
  followers,
  following,
  repositories,
  gists,
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-secondary">{followers}</h2>
        <span>followers</span>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-secondary">{following}</h2>
        <span>following</span>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-secondary">{repositories}</h2>
        <span>repositories</span>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-secondary">{gists}</h2>
        <span>gists</span>
      </div>
    </div>
  );
};

export default Stats;
