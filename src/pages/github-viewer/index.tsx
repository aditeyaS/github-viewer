import { useParams } from "react-router-dom";
import AboutCard from "./about-card";
import Topbar from "./topbar";
import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import UserModel from "../../model/UserModel";
import ReadmeMd from "./readme-md";
import { SocialModel } from "../../model/SocialModel";
import Repositories from "./repositories";
import { RepositoryModel } from "../../model/RepositoryModel";

const GithubViewer = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<UserModel>();
  const [socialsData, setSocialsData] = useState<SocialModel[]>([]);
  const [repoitories, setRepositories] = useState<RepositoryModel[]>([]);

  const loadData = useCallback(async () => {
    try {
      const userResponse = await api.get(`users/${username}`);
      const userResponseData: UserModel = userResponse.data;
      const socialsResponse = await api.get(
        `users/${username}/social_accounts`
      );
      const socialsResponseData: SocialModel[] = socialsResponse.data;
      const reposResponse = await api.get(
        `users/${username}/repos?sort=updated`
      );
      // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
      const reposResponseData: RepositoryModel[] = reposResponse.data;
      setRepositories(reposResponseData);
      setSocialsData(socialsResponseData);
      setUserData(userResponseData);
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  useEffect(() => {
    loadData();
  }, [username, loadData]);

  return (
    <div className="h-full w-full bg-base-300 p-10 flex flex-col gap-5">
      <Topbar />
      {userData && <AboutCard userData={userData} socialsData={socialsData} />}
      <Repositories repos={repoitories} />
      <ReadmeMd />
    </div>
  );
};

export default GithubViewer;
