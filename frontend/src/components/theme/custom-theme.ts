import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteColorOptions,
} from "@mui/material/styles";

const { palette } = createTheme();

declare module "@mui/material/styles" {
  interface Palette {
    bgColor: PaletteColorOptions;
    primary_btn: PaletteColorOptions;
    status: {
      error: string;
      success: string;
    };
    nav_btn: PaletteColorOptions;
  }

  interface PaletteOptions {
    bgColor?: PaletteColorOptions;
    primary_btn?: PaletteColorOptions;
    status?: {
      error: string;
      success: string;
    };
    nav_btn?: PaletteColorOptions;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary_btn: true;
    nav_btn: true;
  }
}

export const theme = createTheme({
  palette: {
    bgColor: palette.augmentColor({
      color: {
        main: "#FFFFFF",
      },
    }),
    primary_btn: palette.augmentColor({
      color: {
        main: "#5392F9",
      },
    }),
    nav_btn: palette.augmentColor({
      color: {
        main: "#000000",
      },
    }),
    primary: {
      main: "#5392F9",
      dark: "#2962ff",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#000000",
    },
    status: {
      error: "#FF0000",
      success: "#00FF00",
    },
  },
});
