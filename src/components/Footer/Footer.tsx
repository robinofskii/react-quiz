import './Footer.scss';

interface Props {
  children: React.ReactNode;
}

const Footer = ({ children }: Props) => {
  return <footer className="footer-container">{children}</footer>;
};

export default Footer;
