import React from "react";
import GithubIcon from "../../../icons/GithubIcon";
import TwitterIcon from "../../../icons/TwitterIcon";
import WebIcon from "../../../icons/WebIcon";
import { SocialModel } from "../../../model/SocialModel";
import LinkedinIcon from "../../../icons/LinkedinIcon";
import InstagramIcon from "../../../icons/InstagramIcon";

interface SocialsProps {
  username: string;
  blog: string;
  socials: SocialModel[];
}

const Socials: React.FC<SocialsProps> = ({ username, blog, socials }) => {
  const openSocial = (url: string) => {
    window.open(url, "_blank");
  };

  const getIcon = (provider: string) => {
    if (provider === "twitter") {
      return <TwitterIcon />;
    } else if (provider === "linkedin") {
      return <LinkedinIcon />;
    } else if (provider === "instagram") {
      return <InstagramIcon />;
    } else {
      return <WebIcon />;
    }
  };

  return (
    <div className="flex gap-2">
      {blog && (
        <button className="btn btn-circle" onClick={() => openSocial(blog)}>
          <WebIcon />
        </button>
      )}
      <button
        className="btn btn-circle"
        onClick={() => openSocial(`https://github.com/${username}`)}
      >
        <GithubIcon />
      </button>
      {socials.map((social) => (
        <button
          className="btn btn-circle"
          key={social.provider}
          onClick={() => openSocial(social.url)}
        >
          {getIcon(social.provider)}
        </button>
      ))}
    </div>
  );
};

export default Socials;
