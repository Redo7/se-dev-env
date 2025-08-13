import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overlay from "./components/Overlay";
import HomeScreen from "./components/HomeScreen";
import { ThemeProvider } from './components/ThemeProvider';

const App = () => {
	// const [isDarkMode, setIsDarkMode] = useState(true);
	// const isDarkMode = true;
	// document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Router>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/:id" element={<Overlay />} />
			</Routes>
			</Router>
		</ThemeProvider>
	  );
}

export default App