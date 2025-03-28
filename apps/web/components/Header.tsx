import { GithubLogo, DiscordLogo, XLogo } from '@phosphor-icons/react/dist/ssr';

const socials = [
  {
    name: 'own.page',
    url: 'https://own.page',
    icon: () => (
      <div className="size-6 flex items-center justify-center">
        <img
          src="/own.page_logo_bold.svg"
          alt="own.page logo"
          className="!h-[23px]"
        />
      </div>
    )
  },
  {
    name: 'Github',
    url: 'https://github.com/own-page/own.tiles',
    icon: GithubLogo,
    label: 'Github logo'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/GVz4ykbh6C',
    icon: DiscordLogo,
    label: 'Discord logo'
  },
  { name: 'X', url: 'https://x.com/own_pages', icon: XLogo, label: 'X logo' }
];

const P = (props: React.PropsWithChildren) => (
  <p className="text-white text-sm font-medium pt-4">{props.children}</p>
);

type HeaderProps = {
  showHeader: boolean;
};

const Header = (props: HeaderProps) => (
  <header
    role="banner"
    data-visible={props.showHeader}
    className="space-y-4 flex flex-col items-center justify-center 
    transition-all duration-500
    data-[visible=false]:opacity-80
    data-[visible=false]:blur-xl
    data-[visible=false]:pointer-events-none
    data-[visible=false]:select-none
    "
    aria-hidden={!props.showHeader}
  >
    <h1 className="font-semibold text-7xl sm:text-8xl text-white">own.tiles</h1>
    <P>the open source repository for grid-based web widgets</P>
    <div className="flex gap-4" aria-label="Social links">
      {socials.map((social) => (
        <a
          href={social.url}
          key={social.name}
          aria-label={social.name}
          className="rounded-md"
        >
          <social.icon
            size={24}
            weight="fill"
            className="text-white"
            aria-label={social.label}
          />
        </a>
      ))}
    </div>
    <P>gratefully funded by</P>
    <div>
      <a
        href="https://www.netidee.at/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md"
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
