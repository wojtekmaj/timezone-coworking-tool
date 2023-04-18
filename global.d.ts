declare module '*.module.css';

declare module 'compact-timezone-list' {
  export type Timezone = {
    offset: string;
    label: string;
    tzCode: string;
  };

  const timezones: Timezone[];

  export const minimalTimezoneSet: Timezone[];

  export default timezones;
}
