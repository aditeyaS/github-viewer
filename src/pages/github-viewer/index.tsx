import { useParams } from "react-router-dom";
import AboutCard from "./about-card";
import Topbar from "./topbar";
import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import UserModel from "../../model/UserModel";
import ReadmeMd from "./readme-md";
import { SocialModel } from "../../model/SocialModel";
import Repositories from "./repositories";

const GithubViewer = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserModel>();
  const [socialsData, setSocialsData] = useState<SocialModel[]>([]);

  const loadData = useCallback(async () => {
    try {
      const userResponse = await api.get(`users/${username}`);
      const userResponseData: UserModel = userResponse.data;
      const socialsResponse = await api.get(
        `users/${username}/social_accounts`
      );
      const socialsResponseData: SocialModel[] = socialsResponse.data;
      setSocialsData(socialsResponseData);
      setUserData(userResponseData);
      setLoading(false);
      setIsValidUser(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadData();
  }, [username, loadData]);

  return (
    <div className="h-full w-full bg-base-300 p-10 flex flex-col gap-5">
      <Topbar />
      {loading ? (
        <>loading</>
      ) : isValidUser && userData ? (
        <div className="flex flex-col gap-5">
          <AboutCard userData={userData} socialsData={socialsData} />
          <Repositories username={userData.login} />
          <ReadmeMd />
        </div>
      ) : (
        <>Invalid</>
      )}
    </div>
  );
};

export default GithubViewer;
