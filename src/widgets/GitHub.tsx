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

const displayColorTheme = (colorTheme: string): string[] => {
  if (colorTheme === 'github') {
    return ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
  } else if (colorTheme === 'colorful') {
    //return ['var(--interpolate-start)', 'var(--interpolate-end)'];
    return [
      'var(--github1)',
      'var(--github2)',
      'var(--github3)',
      'var(--github4)',
      'var(--github5)'
    ];
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
        overflow: 'clip'
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
      blockSize={12}
      blockMargin={3}
      transformData={selectLastHalfYear(props.months)}
      username={props.username}
    />
  );
};

const InnerCalendarMemo = memo(InnerCalendar);

export const GitHub = (props: Props) => {
  const months =
    props.grid !== undefined ? Math.floor(props.grid.w * 1.37) : 12;

  const username = props.username || 'DominikScholz';
  const showUsername = props.showUsername;
  const colorTheme = props.color || 'colorful';

  return (
    <InnerOwnTile
      className="size-full p-9 overflow-clip relative bg-white [&_div]:!overflow-hidden"
      style={
        {
          '--github1': 'hsl(from var(--background-color) h s 95%)',
          '--github2': 'hsl(from var(--background-color) h s 84%)',
          '--github3': 'hsl(from var(--background-color) h s 70%)',
          '--github4': 'hsl(from var(--background-color) h s 59%)',
          '--github5': 'hsl(from var(--background-color) h s 40%)',
          direction: 'rtl'
        } as any
      }
      //  text-black/80 [&_footer]:text-black/60
      // text-white/90 [&_footer]:text-white/60 bg-[#0d1117]"
      // bg-gradient-to-tr from-[#0d1117] to-[#0d1117]
      // style={{
      //   boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.1)'
      // }}
    >
      <div
        className="text-white bg-black/90 rounded-full 
          size-10 flex-center absolute top-4 left-4 z-10 p-2 backdrop-blur-xl whitespace-nowrap
          "
        style={{
          filter:
            'drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white)'
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
            filter:
              'drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white)'
          }}
        >
          {username}
        </div>
      )}

      {/* <div
        className="absolute size-full mix-blend-color"
        style={{
          backgroundColor: 'var(--background-color)',
          transform: 'translate3d(0,0,0)'
        }}
      ></div> */}
      <InnerCalendarMemo
        username={username}
        months={months}
        colorTheme={colorTheme}
      />
    </InnerOwnTile>
  );
};

export const tile: RawTileInfo<'github', Props> = {
  name: 'github',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://github.com/',
  props: {
    username: { slowLoad: true },
    showUsername: { slowLoad: false }
  },
  minDimensions: { w: 3, h: 2 },
  Component: memo(GitHub)
};
