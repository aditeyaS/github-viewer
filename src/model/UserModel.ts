export interface UserModel {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export default UserModel;

export const testUserModel = {
  login: "aditeyaS",
  id: 40860970,
  node_id: "MDQ6VXNlcjQwODYwOTcw",
  avatar_url: "https://avatars.githubusercontent.com/u/40860970?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/aditeyaS",
  html_url: "https://github.com/aditeyaS",
  followers_url: "https://api.github.com/users/aditeyaS/followers",
  following_url: "https://api.github.com/users/aditeyaS/following{/other_user}",
  gists_url: "https://api.github.com/users/aditeyaS/gists{/gist_id}",
  starred_url: "https://api.github.com/users/aditeyaS/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/aditeyaS/subscriptions",
  organizations_url: "https://api.github.com/users/aditeyaS/orgs",
  repos_url: "https://api.github.com/users/aditeyaS/repos",
  events_url: "https://api.github.com/users/aditeyaS/events{/privacy}",
  received_events_url: "https://api.github.com/users/aditeyaS/received_events",
  type: "User",
  site_admin: false,
  name: "Adi",
  company: null,
  blog: "https://aditeya.me",
  location: "United States",
  email: null,
  hireable: true,
  bio: "🧑🏽‍💻 Software Engineer • 🧑🏽‍🎓 MSCS Grad from Clemson • 📚 Always learning",
  twitter_username: null,
  public_repos: 12,
  public_gists: 0,
  followers: 8,
  following: 12,
  created_at: "2018-07-05T13:00:27Z",
  updated_at: "2024-05-23T16:23:18Z",
};
