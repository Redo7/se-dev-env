import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overlay from "./components/Overlay";
import HomeScreen from "./components/HomeScreen";

const App = () => {
	// const [isDarkMode, setIsDarkMode] = useState(true);
	const isDarkMode = true;
	document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	return (
		<Router>
		  <Routes>
			<Route path="/" element={<HomeScreen />} />
			<Route path="/:id" element={<Overlay />} />
		  </Routes>
		</Router>
	  );
}

export default App