import GitHubCalendar from 'react-github-calendar';
import { TileInfo } from '../OwnTiles';

type Props = {
  username: string;
};

const GitHub: React.FC<Props> = (props) => {
  return <GitHubCalendar {...props} />;
};

const tile: TileInfo<'github', Props> = {
  name: 'github',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://github.com/',
  props: {
    username: 'GitHub username'
  },
  Component: GitHub
};

export default tile;
