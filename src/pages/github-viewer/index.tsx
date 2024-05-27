import { useParams } from "react-router-dom";
import AboutCard from "./about-card";
import Topbar from "./topbar";
import { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import UserModel from "../../model/UserModel";

const GithubViewer = () => {
  const [userData, setUserData] = useState<UserModel>();
  const { username } = useParams();

  const loadData = useCallback(async () => {
    try {
      const response = await api.get(`users/${username}`);
      const data: UserModel = response.data;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  useEffect(() => {
    loadData();
  }, [username, loadData]);

  return (
    <div className="h-screen w-screen bg-base-300 p-10 flex flex-col gap-10">
      <Topbar />
      {userData && <AboutCard userData={userData} />}
    </div>
  );
};

export default GithubViewer;
