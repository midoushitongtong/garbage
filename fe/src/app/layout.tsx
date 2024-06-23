'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme, useTheme } from '@mui/material';
import { zhCN } from '@mui/material/locale';
import './layout.scss';
import dnsPrefetchDomain from '@/config/resources/dns-prefetch-domain.json';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = useTheme();
  const themeWithLocale = createTheme(theme, zhCN);

  // 生成 link 标签
  const generateLink = () => {
    const { domains = [] } = dnsPrefetchDomain;
    return domains.map((item) => <link key={item} rel="dns-prefetch" href={item} />);
  };

  return (
    <html lang="zh-CN">
      <head>{generateLink()}</head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={themeWithLocale}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
