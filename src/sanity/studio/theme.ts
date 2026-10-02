import { buildLegacyTheme } from "sanity";

/** Studio palette matched to the /admin dashboard: neutral greys with a blue accent. */
export const studioTheme = buildLegacyTheme({
  "--black": "#121212",
  "--white": "#fafafa",
  "--gray": "#8a8a8a",
  "--gray-base": "#6b6b6b",
  "--component-bg": "#ffffff",
  "--component-text-color": "#121212",
  "--brand-primary": "#4f8bff",
  "--default-button-color": "#6b6b6b",
  "--default-button-primary-color": "#4f8bff",
  "--default-button-success-color": "#22a55a",
  "--default-button-warning-color": "#d99a0b",
  "--default-button-danger-color": "#e5484d",
  "--state-info-color": "#4f8bff",
  "--state-success-color": "#22a55a",
  "--state-warning-color": "#d99a0b",
  "--state-danger-color": "#e5484d",
  "--main-navigation-color": "#171717",
  "--main-navigation-color--inverted": "#ededed",
  "--focus-color": "#4f8bff",
});
