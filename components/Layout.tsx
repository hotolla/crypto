import { Box } from '@mui/material';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children, isDarkTheme, onThemeToggle }: any) => {
	return (
		<Box display="flex" flexDirection="column" height="100vh">
			<Header isDarkTheme={isDarkTheme} onThemeToggle={onThemeToggle}/>

			<Box flexGrow={1} overflow="auto" mt={10}>
				{children}
			</Box>

			<Box flexShrink={0}>
				<Footer />
			</Box>
		</Box>
	);
};