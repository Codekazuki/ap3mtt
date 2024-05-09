import { FaGithub } from "react-icons/fa";

function Navbar() {
  return (
    <div className='navbar'>
      <FaGithub className='github-icon' />
      <h1>Kazuki's GitHub Repos</h1>
    </div>
  );
}

export default Navbar;