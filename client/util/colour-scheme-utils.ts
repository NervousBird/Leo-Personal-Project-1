import { UserBorderScheme, UserColorArray, UserFontScheme } from '../../models/customisations.ts'

export function changeHexColor(colour: string, amount: number): string {
  const hexcode = colour.replace(/^#/, '')

  let r = parseInt(hexcode.substring(0, 2), 16)
  let g = parseInt(hexcode.substring(2, 4), 16)
  let b = parseInt(hexcode.substring(4, 6), 16)

  r = r + amount
  g = g + amount
  b = b + amount

  r = r > 255 ? 255 : r
  g = g > 255 ? 255 : g
  b = b > 255 ? 255 : b

  r = r < 0 ? 0 : r
  g = g < 0 ? 0 : g
  b = b < 0 ? 0 : b

  const rr = r.toString(16).length == 1 ? '0' + r.toString(16) : r.toString(16)
  const gg = g.toString(16).length == 1 ? '0' + g.toString(16) : g.toString(16)
  const bb = b.toString(16).length == 1 ? '0' + b.toString(16) : b.toString(16)

  return `#${rr}${gg}${bb}`
}

export const changeColorStyles = (name:string, value:string) => {
  const dark = changeHexColor(value, -20)
  const light1 = changeHexColor(value, 20)
  const light2 = changeHexColor(value, 40)

  switch (name) {
    case 'font':
      document.documentElement.style.setProperty('--font', `${value}`)
      break
    case 'background':
      document.documentElement.style.setProperty('--background', `${value}`)
      break
    case 'background1':
      document.documentElement.style.setProperty('--background1', `${value}`)
      break
    case 'background2':
      document.documentElement.style.setProperty('--background2', `${value}`)
      break
    case 'background3':
      document.documentElement.style.setProperty('--background3', `${value}`)
      break
    case 'background4':
      document.documentElement.style.setProperty('--background4', `${value}`)
      break
    case 'button1':
      document.documentElement.style.setProperty('--button1', `${value}`)
      break
    case 'button2':
      document.documentElement.style.setProperty('--button2', `${value}`)
      break
    case 'button3':
      document.documentElement.style.setProperty('--button3', `${value}`)
      break
    case 'button4':
      document.documentElement.style.setProperty('--button4', `${value}`)
      break
    case 'color1':
      document.documentElement.style.setProperty('--color1', `${value}`)
      document.documentElement.style.setProperty('--color1-dark', dark)
      document.documentElement.style.setProperty('--color1-light1', light1)
      document.documentElement.style.setProperty('--color1-light2', light2)
      break
    case 'color2':
      document.documentElement.style.setProperty('--color2', `${value}`)
      document.documentElement.style.setProperty('--color2-dark', dark)
      document.documentElement.style.setProperty('--color2-light1', light1)
      document.documentElement.style.setProperty('--color2-light2', light2)
      break
    case 'color3':
      document.documentElement.style.setProperty('--color3', `${value}`)
      document.documentElement.style.setProperty('--color3-dark', dark)
      document.documentElement.style.setProperty('--color3-light1', light1)
      document.documentElement.style.setProperty('--color3-light2', light2)
      break
    case 'color4':
      document.documentElement.style.setProperty('--color4', `${value}`)
      document.documentElement.style.setProperty('--color4-dark', dark)
      document.documentElement.style.setProperty('--color4-light1', light1)
      document.documentElement.style.setProperty('--color4-light2', light2)
      break
    case 'color5':
      document.documentElement.style.setProperty('--color5', `${value}`)
      document.documentElement.style.setProperty('--color5-dark', dark)
      document.documentElement.style.setProperty('--color5-light1', light1)
      document.documentElement.style.setProperty('--color5-light2', light2)
      break
  }
}

export const appColourSchemes: UserColorArray = {
  original: {
    font: '#110601',
    background: '#deeaf3',
    background1: '#deeaf3',
    background2: '#7f9fe6',
    background3: '#a0bddd',
    background4: '#c0d4eb',
    button1: '#85d685',
    button2: '#e6dd66',
    button3: '#b30f0f',
    button4: '#bbbbbb',
    color1: '#eca859',
    color1dark: '#d17a16',
    color1light1: '#ebbb8e',
    color1light2: '#ebcab3',
    color2: '#e6dd66',
    color2dark: '#e4c53d',
    color2light1: '#ebdb8e',
    color2light2: '#ebdeb3',
    color3: '#7f9fe6',
    color3dark: '#1e59d8',
    color3light1: '#a0bddd',
    color3light2: '#c0d4eb',
    color4: '#85d685',
    color4dark: '#0fa334',
    color4light1: '#a0dda3',
    color4light2: '#c0ebda',
    color5: '#e74b4b',
    color5dark: '#b30f0f',
    color5light1: '#e7a4ad',
    color5light2: '#e7c6c7',
  },
  darkMode: {
    background: '#051c2e',
    background1: '#1b2227',
    background2: '#161b27',
    background3: '#22262a',
    background4: '#2b3036',
    button1: '#0b510b',
    button2: '#705405',
    button3: '#7a0012',
    button4: '#212121',
    color1: '#0f0900',
    color1dark: '#d17a16',
    color1light1: '#ebbb8e',
    color1light2: '#ebcab3',
    color2: '#312c02',
    color2dark: '#e4c53d',
    color2light1: '#ebdb8e',
    color2light2: '#ebdeb3',
    color3: '#020a1c',
    color3dark: '#1e59d8',
    color3light1: '#a0bddd',
    color3light2: '#c0d4eb',
    color4: '#083008',
    color4dark: '#0fa334',
    color4light1: '#a0dda3',
    color4light2: '#c0ebda',
    color5: '#4b0707',
    color5dark: '#b30f0f',
    color5light1: '#e7a4ad',
    color5light2: '#e7c6c7',
    font: '#ede6e3',
  },
  highContrast: {
    font: '#ffffff',
    background: '#000000',
    background1: '#000000',
    background2: '#000000',
    background3: '#000000',
    background4: '#000000',
    button1: '#003300',
    button2: '#332800',
    button3: '#330000',
    button4: '#2e2e2e',
    color1: '#000000',
    color1dark: '#d17a16',
    color1light1: '#ebbb8e',
    color1light2: '#ebcab3',
    color2: '#574400',
    color2dark: '#e4c53d',
    color2light1: '#ebdb8e',
    color2light2: '#ebdeb3',
    color3: '#000b24',
    color3dark: '#1e59d8',
    color3light1: '#a0bddd',
    color3light2: '#c0d4eb',
    color4: '#003300',
    color4dark: '#0fa334',
    color4light1: '#a0dda3',
    color4light2: '#c0ebda',
    color5: '#330000',
    color5dark: '#b30f0f',
    color5light1: '#e7a4ad',
    color5light2: '#e7c6c7',
  },
  retro: {
    background: '#d9dfe8',
    background1: '#ebeae5',
    background2: '#dbd4c7',
    background3: '#a0a0ac',
    background4: '#ece9e4',
    button1: '#67a267',
    button2: '#beb860',
    button3: '#fe5858',
    button4: '#d99068',
    color1: '#d5bf9f',
    color1dark: '#d17a16',
    color1light1: '#ebbb8e',
    color1light2: '#ebcab3',
    color2: '#d3ce88',
    color2dark: '#e4c53d',
    color2light1: '#ebdb8e',
    color2light2: '#ebdeb3',
    color3: '#8ca1cf',
    color3dark: '#1e59d8',
    color3light1: '#a0bddd',
    color3light2: '#c0d4eb',
    color4: '#9dd29d',
    color4dark: '#0fa334',
    color4light1: '#a0dda3',
    color4light2: '#c0ebda',
    color5: '#de7c7c',
    color5dark: '#b30f0f',
    color5light1: '#e7a4ad',
    color5light2: '#e7c6c7',
    font: '#130101',
  },
  sleak: {
    background: '#e5efff',
    background1: '#e5f4ff',
    background2: '#dce7fe',
    background3: '#a9c5fe',
    background4: '#e0efff',
    button1: '#bdffbd',
    button2: '#fef89f',
    button3: '#fe9f9f',
    button4: '#c2d9ff',
    color1: '#fed6a9',
    color1dark: '#d17a16',
    color1light1: '#ebbb8e',
    color1light2: '#ebcab3',
    color2: '#fff780',
    color2dark: '#e4c53d',
    color2light1: '#ebdb8e',
    color2light2: '#ebdeb3',
    color3: '#86acfe',
    color3dark: '#1e59d8',
    color3light1: '#a0bddd',
    color3light2: '#c0d4eb',
    color4: '#a3ffa3',
    color4dark: '#0fa334',
    color4light1: '#a0dda3',
    color4light2: '#c0ebda',
    color5: '#ff9494',
    color5dark: '#b30f0f',
    color5light1: '#e7a4ad',
    color5light2: '#e7c6c7',
    font: '#25201d',
  },
  nature: {
    background: '#ae967e',
    background1: '#ece8d5',
    background2: '#aec78e',
    background3: '#929f60',
    background4: '#dbedc5',
    button1: '#68b04a',
    button2: '#767d1c',
    button3: '#d73c3c',
    button4: '#a6b474',
    color1: '#a4d27f',
    color1dark: '#d17a16',
    color1light1: '#ebbb8e',
    color1light2: '#ebcab3',
    color2: '#d3cc64',
    color2dark: '#e4c53d',
    color2light1: '#ebdb8e',
    color2light2: '#ebdeb3',
    color3: '#bfe2a2',
    color3dark: '#1e59d8',
    color3light1: '#a0bddd',
    color3light2: '#c0d4eb',
    color4: '#68b04a',
    color4dark: '#0fa334',
    color4light1: '#a0dda3',
    color4light2: '#c0ebda',
    color5: '#de604a',
    color5dark: '#b30f0f',
    color5light1: '#e7a4ad',
    color5light2: '#e7c6c7',
    font: '#261303',
  },
}

export const appRadiusSchemes: UserBorderScheme = {
  original: { border: '10px', button: '5px' },
  darkMode: { border: '10px', button: '5px' },
  highContrast: { border: '0px', button: '0px' },
  retro: { border: '0px', button: '0px' },
  sleak: { border: '10px', button: '5px' },
  nature: { border: '0px', button: '0px' },
}

export const appFontSchemes: UserFontScheme = {
  original: { header: '', main: '' },
  darkMode: { header: '', main: '' },
  highContrast: { header: '', main: '' },
  retro: { header: '', main: '' },
  sleak: { header: '', main: '' },
  nature: { header: '', main: '' },
}
