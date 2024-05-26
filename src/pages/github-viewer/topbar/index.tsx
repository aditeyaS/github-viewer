import { useState, KeyboardEvent } from "react";
import themes from "../../../config/theme.config";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../../assets/AppLogo";

const Topbar = () => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  const onThemeChange = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  };

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && usernameInput) {
      setUsernameInput("");
      navigate(`/${usernameInput}`, { replace: true });
    }
  };

  const onLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center">
      <button className="btn btn-circle" onClick={onLogoClick}>
        <AppLogo type="appbar" />
      </button>
      <div className="flex gap-2">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            placeholder="username"
            value={usernameInput}
            onKeyDown={onSearch}
            onChange={(e) => setUsernameInput(e.target.value.trim())}
          />
          {usernameInput ? (
            <kbd className="kbd kbd-xs">return</kbd>
          ) : (
            <>
              <kbd className="kbd kbd-xs">⌘</kbd>
              <kbd className="kbd kbd-xs">K</kbd>
            </>
          )}
        </label>
        <select
          className="select select-bordered w-full max-w-xs capitalize"
          value={currentTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          {themes.map((theme, index) => (
            <option key={index} disabled={theme === currentTheme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Topbar;
