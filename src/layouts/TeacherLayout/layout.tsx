import { Link } from "react-router-dom";

type Props = {
  children: JSX.Element;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="w-68 h-screen">
      <nav>
        <ul>
          <li>
            <Link to="/qcm-creation">Create Qcm</Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
