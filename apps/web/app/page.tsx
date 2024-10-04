import {
  GithubLogo,
  DiscordLogo,
  MagnifyingGlass
} from '@phosphor-icons/react/dist/ssr';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap'
});

const socials = [
  {
    name: 'Github',
    url: 'https://github.com/own-tiles',
    icon: GithubLogo
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/own-tiles',
    icon: DiscordLogo
  }
];

const P = ({ children }: React.PropsWithChildren) => (
  <p className="text-white text-sm font-medium pt-4">{children}</p>
);

const Header = () => (
  <header className="space-y-4 flex flex-col items-center justify-center">
    <h1 className="font-semibold text-8xl text-white">own.tiles</h1>
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
          width={107}
          height={27}
        />
      </a>
    </div>
  </header>
);

const SearchBar = () => (
  <div className="flex items-center justify-center">
    <div className="relative w-96">
      <input
        autoFocus
        type="text"
        placeholder="Search"
        className="bg-white/10 px-5 py-3 w-full border border-white/80 rounded-full
           outline-none text-white placeholder:text-white/50 focus:ring-0 drop-shadow-xl"
      />
      <MagnifyingGlass
        size={24}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
      />
    </div>
  </div>
);

export default function Home() {
  return (
    <div
      className={`w-screen h-screen 
    flex flex-col items-center justify-center
    space-y-16
    bg-gradient-to-bl from-green-400 via-teal-400 to-blue-500 
    ${plus_jakarta_sans.className}`}
    >
      <SearchBar />
      <Header />
    </div>
  );
}
