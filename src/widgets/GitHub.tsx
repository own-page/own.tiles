/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { type GridArea, type RawTileInfo } from 'types';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';
import { InnerOwnTile } from 'InnerOwnTile';

type Props = {
  /** GitHub username */
  username: string;
  /** Show username */
  showUsername: boolean;
  /** Color theme */
  color: 'colorful' | 'github';
  grid?: GridArea;
};

const selectLastHalfYear = (showMonths: number) => (contributions: any) => {
  const now = new Date();
  const monthsAgo = new Date(now);
  monthsAgo.setMonth(now.getMonth() - showMonths);

  return contributions.filter((activity: any) => {
    const date = new Date(activity.date);
    return date >= monthsAgo && date <= now;
  });
};

const displayColorTheme = (colorTheme: string): any => {
  if (colorTheme === 'github') {
    return ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
  } else if (colorTheme === 'colorful') {
    return ['#f2f2f2', 'gray'];
  } else {
    return ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
  }
};

type InnerProps = {
  username: string;
  months: number;
  colorTheme: string;
};

const InnerCalendar = (props: InnerProps) => {
  return (
    <GitHubCalendar
      style={{
        overflow: 'clip',
        justifyContent: 'center'
      }}
      fontSize={14}
      theme={{
        //dark: ['#fafafa', 'gray']
        //light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        light: displayColorTheme(props.colorTheme),
        dark: displayColorTheme(props.colorTheme)
      }}
      hideColorLegend={true}
      hideMonthLabels={true}
      hideTotalCount={true}
      blockSize={13}
      blockMargin={4}
      transformData={selectLastHalfYear(props.months)}
      username={props.username}
    />
  );
};

const InnerCalendarMemo = memo(InnerCalendar);

export const GitHub = (props: Props) => {
  // const months =
  //   props.grid !== undefined ? Math.floor(props.grid.w * 1.37) : 12;

  const username = props.username || 'DominikScholz';
  const showUsername = props.showUsername;
  const colorTheme = props.color || 'colorful';

  return (
    <a
      className="w-full h-full"
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <InnerOwnTile
        className="flex size-full p-7 pl-5 overflow-clip relative bg-white [&_div]:!overflow-hidden [&_rect]:!stroke-none"
        style={{
          direction: 'rtl'
        }}
      >
        <div
          className="bg-[linear-gradient(to_right,white,white,transparent)]
          flex-center absolute top-0 left-2 z-8 p-0 h-full w-10 whitespace-nowrap"
        />
        <div
          className="text-white bg-black/90 rounded-full 
          size-10 flex-center absolute top-4 left-4 z-10 p-2 backdrop-blur-xl whitespace-nowrap
          "
          style={{
            boxShadow:
              '0 0 1rem white, 0 0 2rem white, 0 0 4rem white, 0 0 8rem white'
          }}
        >
          <GithubLogo size={'100%'} />
        </div>
        {showUsername && (
          <div
            className="text-[#0a0909c4] bg-white 
        absolute left-4 bottom-4 z-10
        flex-center rounded-full px-5 h-10 
        font-['Plus_Jakarta_Sans'] font-medium text-base"
            style={{
              boxShadow:
                '0 0 1rem white, 0 0 2rem white, 0 0 4rem white, 0 0 8rem white'
            }}
          >
            {username}
          </div>
        )}

        <div
          className="absolute size-full mix-blend-color"
          style={{
            display: colorTheme === 'github' ? 'none' : 'block',
            backgroundColor: 'var(--background-color)'
          }}
        ></div>
        <InnerCalendarMemo
          username={username}
          months={12}
          colorTheme={colorTheme}
        />
      </InnerOwnTile>
    </a>
  );
};

export const tile: RawTileInfo<'github', Props> = {
  name: 'github',
  license: { type: 'MIT', fullText: 'MIT' },
  author: {
    name: 'own.page',
    url: 'https://own.page'
  },
  accessibility: {
    rating: 'AA',
    standard: 'WCAG 2.1'
  },
  cookieInformation: [
    {
      type: 'necessary',
      description:
        'Essential cookies required for the GitHub contribution visualization to function properly.'
    }
  ],
  origin: 'https://github.com/',
  props: {
    username: { slowLoad: true },
    showUsername: { slowLoad: false },
    color: { slowLoad: false }
  },
  minDimensions: { w: 4, h: 2 },
  Component: memo(GitHub)
};
