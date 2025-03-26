import { memo, useEffect, useState } from 'react';
import { type RawTileInfo } from 'types';
import { InnerOwnTile } from 'InnerOwnTile';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';

// Define the city options type
type CityOption =
  | 'Accra'
  | 'Addis Ababa'
  | 'Adelaide'
  | 'Algiers'
  | 'Almaty'
  | 'Amman'
  | 'Amsterdam'
  | 'Anadyr'
  | 'Anchorage'
  | 'Ankara'
  | 'Antananarivo'
  | 'Asuncion'
  | 'Athens'
  | 'Atlanta'
  | 'Auckland'
  | 'Baghdad'
  | 'Bangkok'
  | 'Barcelona'
  | 'Beijing'
  | 'Beirut'
  | 'Belgrade'
  | 'Bengaluru'
  | 'Berlin'
  | 'Bogota'
  | 'Boston'
  | 'Brasilia'
  | 'Brisbane'
  | 'Brussels'
  | 'Bucharest'
  | 'Budapest'
  | 'Buenos Aires'
  | 'Cairo'
  | 'Calgary'
  | 'Canberra'
  | 'Cape Town'
  | 'Caracas'
  | 'Casablanca'
  | 'Chicago'
  | 'Copenhagen'
  | 'Dallas'
  | 'Dar es Salaam'
  | 'Darwin'
  | 'Denver'
  | 'Detroit'
  | 'Dhaka'
  | 'Doha'
  | 'Dubai'
  | 'Dublin'
  | 'Edmonton'
  | 'Frankfurt'
  | 'Guatemala City'
  | 'Halifax'
  | 'Hanoi'
  | 'Harare'
  | 'Havana'
  | 'Helsinki'
  | 'Hong Kong'
  | 'Honolulu'
  | 'Houston'
  | 'Indianapolis'
  | 'Islamabad'
  | 'Istanbul'
  | 'Jakarta'
  | 'Jerusalem'
  | 'Johannesburg'
  | 'Kabul'
  | 'Karachi'
  | 'Kathmandu'
  | 'Khartoum'
  | 'Kingston'
  | 'Kinshasa'
  | 'Kiritimati'
  | 'Kolkata'
  | 'Kuala Lumpur'
  | 'Kuwait City'
  | 'Kyiv'
  | 'La Paz'
  | 'Lagos'
  | 'Lahore'
  | 'Las Vegas'
  | 'Lima'
  | 'Lisbon'
  | 'London'
  | 'Los Angeles'
  | 'Madrid'
  | 'Managua'
  | 'Manila'
  | 'Melbourne'
  | 'Mexico City'
  | 'Miami'
  | 'Minneapolis'
  | 'Minsk'
  | 'Montevideo'
  | 'Montréal'
  | 'Moscow'
  | 'Mumbai'
  | 'Nairobi'
  | 'Nassau'
  | 'New Delhi'
  | 'New Orleans'
  | 'New York'
  | 'Oslo'
  | 'Ottawa'
  | 'Paris'
  | 'Perth'
  | 'Philadelphia'
  | 'Phoenix'
  | 'Prague'
  | 'Reykjavik'
  | 'Rio de Janeiro'
  | 'Riyadh'
  | 'Rome'
  | 'Salt Lake City'
  | 'San Francisco'
  | 'San Juan'
  | 'San Salvador'
  | 'Santiago'
  | 'Santo Domingo'
  | 'São Paulo'
  | 'Seattle'
  | 'Seoul'
  | 'Shanghai'
  | 'Singapore'
  | 'Sofia'
  | "St. John's"
  | 'Stockholm'
  | 'Suva'
  | 'Sydney'
  | 'Taipei'
  | 'Tallinn'
  | 'Tashkent'
  | 'Tegucigalpa'
  | 'Tehran'
  | 'Tokyo'
  | 'Toronto'
  | 'Vancouver'
  | 'Vienna'
  | 'Warsaw'
  | 'Washington DC'
  | 'Winnipeg'
  | 'Yangon'
  | 'Zagreb'
  | 'Zürich';

// City to timezone mapping
const cityToTimezoneMap: Record<CityOption, string> = {
  Accra: 'Africa/Accra',
  'Addis Ababa': 'Africa/Addis_Ababa',
  Adelaide: 'Australia/Adelaide',
  Algiers: 'Africa/Algiers',
  Almaty: 'Asia/Almaty',
  Amman: 'Asia/Amman',
  Amsterdam: 'Europe/Amsterdam',
  Anadyr: 'Asia/Anadyr',
  Anchorage: 'America/Anchorage',
  Ankara: 'Europe/Istanbul',
  Antananarivo: 'Indian/Antananarivo',
  Asuncion: 'America/Asuncion',
  Athens: 'Europe/Athens',
  Atlanta: 'America/New_York',
  Auckland: 'Pacific/Auckland',
  Baghdad: 'Asia/Baghdad',
  Bangkok: 'Asia/Bangkok',
  Barcelona: 'Europe/Madrid',
  Beijing: 'Asia/Shanghai',
  Beirut: 'Asia/Beirut',
  Belgrade: 'Europe/Belgrade',
  Bengaluru: 'Asia/Kolkata',
  Berlin: 'Europe/Berlin',
  Bogota: 'America/Bogota',
  Boston: 'America/New_York',
  Brasilia: 'America/Sao_Paulo',
  Brisbane: 'Australia/Brisbane',
  Brussels: 'Europe/Brussels',
  Bucharest: 'Europe/Bucharest',
  Budapest: 'Europe/Budapest',
  'Buenos Aires': 'America/Buenos_Aires',
  Cairo: 'Africa/Cairo',
  Calgary: 'America/Edmonton',
  Canberra: 'Australia/Canberra',
  'Cape Town': 'Africa/Johannesburg',
  Caracas: 'America/Caracas',
  Casablanca: 'Africa/Casablanca',
  Chicago: 'America/Chicago',
  Copenhagen: 'Europe/Copenhagen',
  Dallas: 'America/Chicago',
  'Dar es Salaam': 'Africa/Dar_es_Salaam',
  Darwin: 'Australia/Darwin',
  Denver: 'America/Denver',
  Detroit: 'America/Detroit',
  Dhaka: 'Asia/Dhaka',
  Doha: 'Asia/Qatar',
  Dubai: 'Asia/Dubai',
  Dublin: 'Europe/Dublin',
  Edmonton: 'America/Edmonton',
  Frankfurt: 'Europe/Berlin',
  'Guatemala City': 'America/Guatemala',
  Halifax: 'America/Halifax',
  Hanoi: 'Asia/Ho_Chi_Minh',
  Harare: 'Africa/Harare',
  Havana: 'America/Havana',
  Helsinki: 'Europe/Helsinki',
  'Hong Kong': 'Asia/Hong_Kong',
  Honolulu: 'Pacific/Honolulu',
  Houston: 'America/Chicago',
  Indianapolis: 'America/Indianapolis',
  Islamabad: 'Asia/Karachi',
  Istanbul: 'Europe/Istanbul',
  Jakarta: 'Asia/Jakarta',
  Jerusalem: 'Asia/Jerusalem',
  Johannesburg: 'Africa/Johannesburg',
  Kabul: 'Asia/Kabul',
  Karachi: 'Asia/Karachi',
  Kathmandu: 'Asia/Kathmandu',
  Khartoum: 'Africa/Khartoum',
  Kingston: 'America/Jamaica',
  Kinshasa: 'Africa/Kinshasa',
  Kiritimati: 'Pacific/Kiritimati',
  Kolkata: 'Asia/Kolkata',
  'Kuala Lumpur': 'Asia/Kuala_Lumpur',
  'Kuwait City': 'Asia/Kuwait',
  Kyiv: 'Europe/Kiev',
  'La Paz': 'America/La_Paz',
  Lagos: 'Africa/Lagos',
  Lahore: 'Asia/Karachi',
  'Las Vegas': 'America/Los_Angeles',
  Lima: 'America/Lima',
  Lisbon: 'Europe/Lisbon',
  London: 'Europe/London',
  'Los Angeles': 'America/Los_Angeles',
  Madrid: 'Europe/Madrid',
  Managua: 'America/Managua',
  Manila: 'Asia/Manila',
  Melbourne: 'Australia/Melbourne',
  'Mexico City': 'America/Mexico_City',
  Miami: 'America/New_York',
  Minneapolis: 'America/Chicago',
  Minsk: 'Europe/Minsk',
  Montevideo: 'America/Montevideo',
  Montréal: 'America/Toronto',
  Moscow: 'Europe/Moscow',
  Mumbai: 'Asia/Kolkata',
  Nairobi: 'Africa/Nairobi',
  Nassau: 'America/Nassau',
  'New Delhi': 'Asia/Kolkata',
  'New Orleans': 'America/Chicago',
  'New York': 'America/New_York',
  Oslo: 'Europe/Oslo',
  Ottawa: 'America/Toronto',
  Paris: 'Europe/Paris',
  Perth: 'Australia/Perth',
  Philadelphia: 'America/New_York',
  Phoenix: 'America/Phoenix',
  Prague: 'Europe/Prague',
  Reykjavik: 'Atlantic/Reykjavik',
  'Rio de Janeiro': 'America/Sao_Paulo',
  Riyadh: 'Asia/Riyadh',
  Rome: 'Europe/Rome',
  'Salt Lake City': 'America/Denver',
  'San Francisco': 'America/Los_Angeles',
  'San Juan': 'America/Puerto_Rico',
  'San Salvador': 'America/El_Salvador',
  Santiago: 'America/Santiago',
  'Santo Domingo': 'America/Santo_Domingo',
  'São Paulo': 'America/Sao_Paulo',
  Seattle: 'America/Los_Angeles',
  Seoul: 'Asia/Seoul',
  Shanghai: 'Asia/Shanghai',
  Singapore: 'Asia/Singapore',
  Sofia: 'Europe/Sofia',
  "St. John's": 'America/St_Johns',
  Stockholm: 'Europe/Stockholm',
  Suva: 'Pacific/Fiji',
  Sydney: 'Australia/Sydney',
  Taipei: 'Asia/Taipei',
  Tallinn: 'Europe/Tallinn',
  Tashkent: 'Asia/Tashkent',
  Tegucigalpa: 'America/Tegucigalpa',
  Tehran: 'Asia/Tehran',
  Tokyo: 'Asia/Tokyo',
  Toronto: 'America/Toronto',
  Vancouver: 'America/Vancouver',
  Vienna: 'Europe/Vienna',
  Warsaw: 'Europe/Warsaw',
  'Washington DC': 'America/New_York',
  Winnipeg: 'America/Winnipeg',
  Yangon: 'Asia/Yangon',
  Zagreb: 'Europe/Zagreb',
  Zürich: 'Europe/Zurich'
};

type Props = {
  /** City */
  city?: CityOption;
  /** Color theme */
  color?: 'light' | 'dark';
  /** Use 12h format */
  use12h?: boolean;
  /** Hide seconds */
  hideSeconds?: boolean;
  /** Hide date */
  hideDate?: boolean;
  /** Hide timezone */
  hideTimezone?: boolean;
};

export const Clock = (props: Props) => {
  const [time, setTime] = useState(new Date());

  const city = props.city ?? 'Vienna';
  const timezone = cityToTimezoneMap[city];
  const color = props.color ?? 'light';
  const use12h = props.use12h ?? false;
  const hideSeconds = props.hideSeconds ?? false;
  const hideDate = props.hideDate ?? false;
  const hideTimezone = props.hideTimezone ?? false;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Format time
  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      hour12: use12h
    };

    if (!hideSeconds) {
      options.second = '2-digit';
    }

    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  // Format date
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: timezone
    };

    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  // Get dynamic styles based on theme
  const getThemeStyles = () => {
    switch (color) {
      case 'dark':
        return {
          container: 'bg-gray-900 text-white',
          icon: 'bg-white/10 text-white',
          time: 'text-white',
          details: 'opacity-80'
        };
      case 'light':
      default:
        return {
          container: 'bg-white text-gray-900',
          icon: 'bg-black/90 text-white',
          time: 'text-gray-900',
          details: 'opacity-80'
        };
    }
  };

  const styles = getThemeStyles();
  const boxShadow =
    color === 'dark'
      ? '0 0 1rem rgba(255, 255, 255, 0.1)'
      : '0 0 1rem rgba(0, 0, 0, 0.1)';

  return (
    <InnerOwnTile
      className={`size-full p-7 overflow-clip relative flex flex-col items-center justify-center ${styles.container}`}
    >
      <div
        className={`absolute top-4 left-4 z-10 size-10 flex-center rounded-full p-2 backdrop-blur-xl ${styles.icon}`}
        style={{ boxShadow }}
      >
        <ClockIcon size={'100%'} weight="duotone" aria-label="Clock icon" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className={`text-6xl font-bold tracking-tighter ${styles.time}`}>
          {formatTime()}
        </div>

        {(!hideDate || !hideTimezone) && (
          <div className={`mt-2 text-xl ${styles.details}`}>
            {!hideDate && formatDate()}
            {!hideDate && !hideTimezone && ' • '}
            {!hideTimezone && city}
          </div>
        )}
      </div>
    </InnerOwnTile>
  );
};

export const tile: RawTileInfo<'clock', Props> = {
  name: 'clock',
  license: { type: 'MIT', fullText: 'MIT' },
  author: {
    name: 'own.page',
    url: 'https://own.page'
  },
  accessibility: {
    rating: 'AAA',
    standard: 'WCAG 2.1'
  },
  cookieInformation: [
    { type: 'no cookies', description: 'This widget sets no cookies' }
  ],
  origin: '',
  minDimensions: {
    w: 4,
    h: 2
  },
  maxDimensions: {
    w: 6,
    h: 2
  },
  props: {
    city: { slowLoad: false, defaultValue: 'Vienna' },
    color: { slowLoad: false, defaultValue: 'light' },
    use12h: { slowLoad: false },
    hideSeconds: { slowLoad: false },
    hideDate: { slowLoad: false },
    hideTimezone: { slowLoad: false }
  },
  Component: memo(Clock)
};
