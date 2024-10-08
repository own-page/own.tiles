/* eslint-disable @next/next/no-img-element */
import { GithubLogo, DiscordLogo, XLogo } from '@phosphor-icons/react/dist/ssr';
import OwnPageLogo from '../public/own.page_logo_bold.svg';

const socials = [
  {
    name: 'own.page',
    url: 'https://own.page',
    icon: () => (
      <div className="size-6 flex items-center justify-center">
        <OwnPageLogo height={23} />
      </div>
    )
  },
  {
    name: 'Github',
    url: 'https://github.com/own-page/own.tiles',
    icon: GithubLogo
  },
  { name: 'Discord', url: 'https://discord.gg/GVz4ykbh6C', icon: DiscordLogo },
  { name: 'X', url: 'https://x.com/own_pages', icon: XLogo }
];

const P = (props: React.PropsWithChildren) => (
  <p className="text-white/70 text-sm font-medium pt-4">{props.children}</p>
);

type HeaderProps = {
  showHeader: boolean;
};

const Header = (props: HeaderProps) => (
  <header
    data-visible={props.showHeader}
    className="space-y-4 flex flex-col items-center justify-center 
    transition-all duration-500
    data-[visible=false]:opacity-80
    data-[visible=false]:blur-xl
    data-[visible=false]:pointer-events-none
    data-[visible=false]:select-none
    "
  >
    <h1 className="font-semibold text-7xl sm:text-8xl text-white">own.tiles</h1>
    <P>the open source repository for grid-based web widgets</P>
    <div className="flex gap-4">
      {socials.map((social) => (
        <a href={social.url} key={social.name}>
          <social.icon size={24} weight="fill" />
        </a>
      ))}
    </div>
    <P>gratefully funded by</P>
    <div>
      <a
        href="https://www.netidee.at/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/netidee_logo.svg"
          alt="netidee logo"
          width={128}
          height={32}
        />
      </a>
    </div>
  </header>
);

export default Header;
