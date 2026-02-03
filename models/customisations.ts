export interface UserColorScheme {
  font: string
  background: string
  background1: string
  background2: string,
  background3: string,
  background4: string,
  button1: string,
  button2: string,
  button3: string,
  button4: string,
  color1: string,
  color1dark: string,
  color1light1: string,
  color1light2: string,
  color2: string,
  color2dark: string,
  color2light1: string,
  color2light2: string,
  color3: string,
  color3dark: string,
  color3light1: string,
  color3light2: string,
  color4: string,
  color4dark: string,
  color4light1: string,
  color4light2: string,
  color5: string,
  color5dark: string,
  color5light1: string,
  color5light2: string,
}

export interface UserColorArray {
  original : UserColorScheme
  darkMode: UserColorScheme
  highContrast: UserColorScheme
  retro: UserColorScheme
  sleak: UserColorScheme
  nature: UserColorScheme
}

export interface BorderScheme {
  border: string
  button: string
}

export interface UserBorderScheme {
  original: BorderScheme
  darkMode: BorderScheme
  highContrast: BorderScheme
  retro: BorderScheme
  sleak: BorderScheme
  nature: BorderScheme
}

export interface FontScheme {
  header: string
  main: string
}

export interface UserFontScheme {
  original: FontScheme
  darkMode: FontScheme
  highContrast: FontScheme
  retro: FontScheme
  sleak: FontScheme
  nature: FontScheme
}
