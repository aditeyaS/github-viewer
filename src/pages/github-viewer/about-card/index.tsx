import CompanyIcon from "../../../icons/CompanyIcon";
import JobSearchIcon from "../../../icons/JobSearchIcon";
import LocationIcon from "../../../icons/LocationIcon";
import Avatar from "./Avatar";
import Socials from "./Socials";
import Stats from "./Stats";

const AboutCard = () => {
  return (
    <div className="card shadow-lg compact bg-base-100 mt-10">
      <div className="card-body">
        <div className="flex gap-5 items-center">
          <Avatar username="aditeyaS" />
          <Stats followers={12} following={8} repositories={12} gists={22} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-6xl text-primary font-bold">Adi</h1>
          <span className="text-secondary text-lg">
            🧑🏽‍💻 Software Engineer • 🧑🏽‍🎓 MSCS Grad from Clemson • 📚 Always
            learning
          </span>
          <div>
            <div className="border border-2 border-success w-max p-2 flex gap-4 items-center">
              <JobSearchIcon />
              <span className="text-lg text-success">Open for work</span>
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex gap-2">
              <CompanyIcon />
              Clemson University
            </div>
            <div className="flex gap-2">
              <LocationIcon />
              United States
            </div>
          </div>
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
