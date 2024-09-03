import GitHubCalendar from 'react-github-calendar';
import { TileInfo } from '../OwnTiles';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';

type Props = {
  username: string;
  grid?: any;
};

const selectLastHalfYear = (showMonths: number) => (contributions: any) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = showMonths;

  return contributions.filter((activity: any) => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

const GitHub: React.FC<Props> = (props) => {
  // const small =
  //   props.grid !== undefined ? props.grid.h < 3 || props.grid.w < 3 : false;
  const months =
    props.grid !== undefined ? Math.floor(props.grid.w * 1.37) : 12;

  return (
    <>
      <div
        className="text-white bg-black/90 rounded-full 
          size-10 flex-center absolute top-4 left-4 z-10 p-2 backdrop-blur-xl whitespace-nowrap
          "
        style={{
          filter:
            'drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white)  drop-shadow(0 0 1rem white)  drop-shadow(0 0 1rem white)'
        }}
      >
        <GithubLogo size={48} />
      </div>
      <div
        className="absolute size-full mix-blend-color"
        style={{ backgroundColor: 'var(--background-color)' }}
      ></div>
      <GitHubCalendar
        style={{
          overflow: 'clip'
        }}
        fontSize={14}
        theme={{
          dark: ['fafafa', 'gray']
        }}
        hideColorLegend={true}
        hideMonthLabels={true}
        hideTotalCount={true}
        blockSize={12}
        blockMargin={3}
        transformData={selectLastHalfYear(months)}
        username={props.username}
      />
    </>
  );
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
