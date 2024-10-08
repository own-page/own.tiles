import Imprint from './Imprint';

type FooterProps = {
  className?: string;
};

const Footer = (props: FooterProps) => (
  <footer className={props.className}>
    <Imprint />
  </footer>
);

export default Footer;
