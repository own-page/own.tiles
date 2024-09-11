import GitHubCalendar from 'react-github-calendar';
import { TileInfo } from 'types';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';
import React from 'react';
import { InnerOwnTile } from 'InnerOwnTile';
// import { getPropsInfo } from 'utils/props';

type Props = {
  /** GitHub username */
  username: string;
  /** Grid configuration */
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

export const GitHub = (props: Props) => {
  // const small =
  //   props.grid !== undefined ? props.grid.h < 3 || props.grid.w < 3 : false;
  const months =
    props.grid !== undefined ? Math.floor(props.grid.w * 1.37) : 12;

  return (
    <InnerOwnTile
      className="size-full p-9 overflow-clip relative bg-white"
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
    </InnerOwnTile>
  );
};

export const tile: TileInfo<'github', Props> = {
  name: 'github',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://github.com/',
  props: {} as any, //getPropsInfo<typeof GitHub>(GitHubProps),
  Component: React.memo(GitHub)
};
