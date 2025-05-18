import "./SideBar.css";
import userAvatar from "../../assets/Avatar.svg";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={userAvatar} alt="Default avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}
