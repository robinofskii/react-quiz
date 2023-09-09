import './Main.scss';

interface MainProps {
  children?: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <main id="app-main">{children}</main>;
};

export default Main;
