/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User,
  X,
  CaretDown,
  Link,
  Palette,
  Calendar,
  MapPin
} from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import type { PropInfo, PropsInfo } from 'own.tiles';
import DateTimePicker from './DateTimePicker';

const mapComponents = {
  username: <User weight="bold" />,
  link: <Link weight="bold" />,
  theme: <Palette weight="bold" />,
  date: <Calendar weight="bold" />,
  location: <MapPin weight="bold" />
};

const TextInput: React.FC<{
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  label?: string;
  index: number;
}> = ({ id, value, setValue, placeholder, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // The paste event handler should only apply when the input is focused
    const handlePaste = () => {
      // Only handle paste events when this specific input is focused
      if (inputRef.current && document.activeElement === inputRef.current) {
        // No need to preventDefault - let the normal paste behavior work
        // e.preventDefault();
        // const pastedText = e.clipboardData?.getData('text');
        // if (pastedText) {
        //   setValue(pastedText);
        // }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [setValue]);

  return (
    <>
      <div className="relative rounded-full bg-black/40 px-2 py-0 cursor-text h-10 flex items-center w-72">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          {id in mapComponents && (mapComponents as any)[id]}
        </div>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-white text-left px-7 py-1 focus:outline-none w-full h-full placeholder:text-white/60"
          placeholder={label || placeholder}
          onFocus={(e) => {
            e.target.placeholder = '';
          }}
          onBlur={(e) => {
            e.target.placeholder = label || placeholder;
          }}
          value={value}
          maxLength={256}
          onChange={(e) => setValue(e.target.value)}
          // Handle paste event directly on the input element instead
          onPaste={() => {
            // Let the default paste behavior work
            // No need for custom handling
          }}
        />
        {value && (
          <button
            className="relative right-1 text-white/50 hover:text-white"
            onClick={() => setValue('')}
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>
    </>
  );
};

const Toggle: React.FC<{
  id: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
}> = ({ id, value, setValue, label }) => {
  return (
    <>
      <div className="relative rounded-full px-2 py-0 h-10 flex items-center w-72">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          {id in mapComponents && (mapComponents as any)[id]}
        </div>
        <span className="text-white text-left px-7 py-1">{label || id}</span>
        <label className="absolute right-3 flex items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            className="sr-only peer"
          />
          <div
            className={`
              cursor-pointer w-11 h-6
              rounded-full peer
              bg-black/30
              border-black/20
              transition duration-200 ease-in-out

              hover:outline-none
              hover:ring-4
              hover:ring-white/10

              peer-checked:after:translate-x-full
              rtl:peer-checked:after:-translate-x-full
              peer-checked:after:border-white
              peer-checked:bg-white/50

              after:content-['']
              after:absolute
              after:top-[2px]
              after:start-[2px]
              after:bg-white
              after:border-white/20
              after:border
              after:rounded-full
              after:h-5
              after:w-5
              after:transition-all
              after:duration-200
              after:ease-in-out
            `}
          ></div>
        </label>
      </div>
    </>
  );
};
const Dropdown: React.FC<{
  id: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  options: any[];
  label?: string;
}> = ({ id, value, setValue, options, label }) => {
  const currentValue = value || options[0];

  return (
    <>
      <div className="relative rounded-full px-2 py-0 h-10 flex items-center w-72">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          {id in mapComponents && (mapComponents as any)[id]}
        </div>
        <span className="text-white text-left px-7 py-1">{label || id}</span>
        <div className="absolute right-3 flex items-center">
          <select
            value={currentValue}
            onChange={(e) => setValue(e.target.value)}
            className="w-32 h-8 pl-4 pr-8 text-black/50 bg-white/50 rounded-full appearance-none cursor-pointer focus:outline-none"
          >
            {options.map((option) => (
              <option key={option} value={option} className="bg-white/20">
                {option}
              </option>
            ))}
          </select>
          <CaretDown
            className="absolute right-3 text-black/50 pointer-events-none"
            weight="bold"
            size={16}
          />
        </div>
      </div>
    </>
  );
};

const getComponent = (
  type: PropInfo['type']
): React.ComponentType<any> | null => {
  if (type === 'string') return TextInput;
  if (type === 'boolean') return Toggle;
  if (Array.isArray(type)) return Dropdown;
  if (type === 'date') return DateTimePicker;
  return null;
};

const PropInput: React.FC<{
  id: string;
  value: any;
  info: PropInfo;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  index: number;
}> = (props) => {
  const Component = getComponent(props.info.type);

  if (!Component) return null;

  // Handle default values for different types
  let currentValue = props.value;
  if (currentValue === undefined || currentValue === null) {
    if (props.info.type === 'date') {
      // Use current date as default for date type if not set
      currentValue = props.info.defaultValue || new Date();
    } else {
      currentValue = props.info.defaultValue;
    }
  }

  return (
    <div className="flex items-center justify-center z-[10000] my-2">
      <Component
        id={props.id}
        value={currentValue}
        setValue={props.setValue}
        label={props.info.description}
        placeholder={props.info.type === 'string' ? props.id : undefined}
        options={Array.isArray(props.info.type) ? props.info.type : undefined}
        index={props.index}
      />
    </div>
  );
};

type Props<P> = {
  propsInfo: PropsInfo<P>;
  previewProps: Record<string, any>;
  setPreviewProps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setDebouncedPreviewProps: React.Dispatch<
    React.SetStateAction<Record<string, any>>
  >;
};

const PropsForm = <P,>(props: Props<P>) => {
  return (
    <>
      {Object.entries(props.propsInfo).map(([k, v], index) => (
        <PropInput
          key={k}
          id={k}
          value={props.previewProps[k] ?? ''}
          info={v as PropInfo}
          setValue={(newValue) => {
            const setter = (v as PropInfo).slowLoad
              ? props.setDebouncedPreviewProps
              : props.setPreviewProps;
            setter((p) => ({
              ...p,
              [k]: newValue
            }));
          }}
          index={index}
        />
      ))}
    </>
  );
};

export default PropsForm;
