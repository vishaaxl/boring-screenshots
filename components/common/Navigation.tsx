import { useAuthContext } from "@/context/User";
import {
  BsCodeSlash,
  BsCurrencyDollar,
  BsLaptop,
  BsPersonFillGear,
} from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import styled from "styled-components";

interface Props {}

const Nav = styled.nav`
  height: 70px;
  border-bottom: 2px solid ${({ theme }) => theme.light};
  background: ${({ theme }) => theme.foreground};
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .menu-icon {
    font-size: 2rem;

    @media (min-width: 767px) {
      display: none;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.5rem;
  display: none;

  @media (min-width: 767px) {
    display: flex;
  }

  .link {
    cursor: pointer;
    padding: 0.45rem 1.25rem;
    border-radius: 5px;

    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.8rem;
    transition: all 0.2s ease-in-out;

    &:last-child {
      border: 2px solid ${({ theme }) => theme.light};
    }

    &:hover {
      background: ${({ theme }) => theme.light};
    }
  }
`;

const Navigation: React.FC<Props> = () => {
  const { currentUser, loginWithGoogle, logout } = useAuthContext();
  return (
    <Nav>
      <div className="container">
        <h2 className="logo"></h2>

        <Links>
          <li className="link">
            <BsCodeSlash className="nav-icon" />
            <span>Code Editor</span>
          </li>
          <li className="link">
            <BsLaptop className="nav-icon" />
            <span>Mockups</span>
          </li>
          <li className="link">
            <BsCurrencyDollar className="nav-icon" />
            <span>Pricing</span>
          </li>
          {currentUser ? (
            <li className="link" onClick={logout}>
              <BsPersonFillGear className="nav-icon" />
              {currentUser.displayName
                ?.split(" ")
                .map((word) => word[0])
                .join("")}
            </li>
          ) : (
            <li className="link">
              <BsPersonFillGear className="nav-icon" />
              <span onClick={loginWithGoogle}>Login</span>
            </li>
          )}
        </Links>
        <CgMenuGridO className="menu-icon" />
      </div>
    </Nav>
  );
};
export default Navigation;
