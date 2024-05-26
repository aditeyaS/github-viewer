import GithubIcon from "../../../icons/GithubIcon";
import TwitterIcon from "../../../icons/TwitterIcon";
import WebIcon from "../../../icons/WebIcon";

const Socials = () => {
  return (
    <div className="flex gap-2">
      <button className="btn btn-circle">
        <WebIcon />
      </button>
      <button className="btn btn-circle">
        <GithubIcon />
      </button>
      <button className="btn btn-circle">
        <TwitterIcon />
      </button>
    </div>
  );
};

export default Socials;
