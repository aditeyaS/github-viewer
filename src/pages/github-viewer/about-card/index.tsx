import React from "react";
import CompanyIcon from "../../../icons/CompanyIcon";
import JobSearchIcon from "../../../icons/JobSearchIcon";
import LocationIcon from "../../../icons/LocationIcon";
import UserModel from "../../../model/UserModel";
import Avatar from "./Avatar";
import Socials from "./Socials";
import Stats from "./Stats";

interface AboutCardProps {
  userData: UserModel;
}

const AboutCard: React.FC<AboutCardProps> = ({ userData }) => {
  return (
    <div className="card shadow-lg compact bg-base-100 mt-10">
      <div className="card-body">
        <div className="flex gap-5 items-center">
          <Avatar username={userData.login} />
          <Stats
            followers={userData.followers}
            following={userData.following}
            repositories={userData.public_repos}
            gists={userData.public_gists}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-6xl text-primary font-bold">{userData.name}</h1>
          <span className="text-secondary text-lg">{userData.bio}</span>
          <div>
            <div className="border border-2 border-success w-max p-2 flex gap-4 items-center">
              <JobSearchIcon />
              <span className="text-lg text-success">Open for work</span>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex gap-2">
              <CompanyIcon />
              {userData.company}
            </div>
            <div className="flex gap-2">
              <LocationIcon />
              {userData.location}
            </div>
          </div>
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
