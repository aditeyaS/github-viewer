import React from "react";

interface AvatarProps {
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
  return (
    <div className="avatar">
      <div className="w-36 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 hover:ring-offset-8">
        <img src={`https://github.com/${username}.png`} />
      </div>
    </div>
  );
};

export default Avatar;
