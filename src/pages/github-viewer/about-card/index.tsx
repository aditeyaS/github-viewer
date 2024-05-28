import React from "react";
import CompanyIcon from "../../../icons/CompanyIcon";
import LocationIcon from "../../../icons/LocationIcon";
import UserModel from "../../../model/UserModel";
import Avatar from "./Avatar";
import Socials from "./Socials";
import Stats from "./Stats";
import { SocialModel } from "../../../model/SocialModel";

interface AboutCardProps {
  userData: UserModel;
  socialsData: SocialModel[];
}

const AboutCard: React.FC<AboutCardProps> = ({ userData, socialsData }) => {
  return (
    <div className="card shadow-lg compact bg-base-100 mt-10">
      <div className="card-body">
        <div className="flex flex-col gap-5 justify-center items-center">
          <Avatar username={userData.login} />
          <Stats
            followers={userData.followers}
            following={userData.following}
            repositories={userData.public_repos}
            gists={userData.public_gists}
          />
          {userData.name && (
            <h1 className="text-6xl text-primary">{userData.name}</h1>
          )}
          {userData.bio && (
            <span className="text-secondary text-lg">{userData.bio}</span>
          )}
          {userData.hireable && (
            <h3 className="bg-success text-success-content py-1 px-2 rounded text-lg">
              #OpenToWork
            </h3>
          )}
          {userData.company && userData.location && (
            <div className="flex flex-row gap-5">
              {userData.company && (
                <div className="flex gap-2 items-center">
                  <CompanyIcon />
                  {userData.company}
                </div>
              )}
              {userData.location && (
                <div className="flex gap-2 items-center">
                  <LocationIcon />
                  {userData.location}
                </div>
              )}
            </div>
          )}
          <Socials
            username={userData.login}
            blog={userData.blog}
            socials={socialsData}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
