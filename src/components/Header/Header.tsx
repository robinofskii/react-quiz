import ReactLogo from '../../assets/react.svg';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <img src={ReactLogo} alt="React Logo" />
      <h1>The React Quiz</h1>
    </header>
  );
};

export default Header;
