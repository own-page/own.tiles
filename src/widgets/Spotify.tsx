// import { InnerOwnTile } from '../InnerOwnTile';
import { TileInfo } from '../OwnTiles';
// import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';

type Props = {
  //   username: string;
  useColor?: boolean | string;
  grid?: any;
};

const Spotify: React.FC<Props> = (props) => {
  const useColor =
    typeof props.useColor === 'string'
      ? props.useColor.toLowerCase() === 'true'
      : (props.useColor ?? true);
  const themeString = useColor ? '' : '&theme=0';

  return (
    <iframe
      style={{ clipPath: 'inset(0 round 2.25rem)' }}
      src={`https://open.spotify.com/embed/playlist/37i9dQZF1E4AfEUiirXPyP?utm_source=generator${themeString}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const tile: TileInfo<'spotify', Props> = {
  name: 'spotify',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://spotify.com/',
  props: {
    useColor: 'Color?'
    // username: 'GitHub username'
  },
  Component: Spotify
};

export default tile;
