export interface BannerColorScheme {
  foreground: string;
  background: string;
  name: string;
}

export interface BannerConfig {
  colorScheme: BannerColorScheme;
  referrer: string;
}
