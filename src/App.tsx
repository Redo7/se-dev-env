import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overlay from './components/Overlay';
import HomeScreen from './components/HomeScreen';
import { ThemeProvider } from './components/ThemeProvider';
import { useEffect } from 'react';
import Trash from './components/Trash';
import { Toaster } from './components/ui/sonner';

const App = () => {
	// const [isDarkMode, setIsDarkMode] = useState(true);
	// const isDarkMode = true;
	// document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	const deletionExpiryCheck = async () => {
		const res = await fetch(`/api/data/deletion-data`);
		type DeletionData = Record<string, Record<string, number>>;
		const data: DeletionData = await res.json();
		const now = Date.now();
		const widgetsToDelete: { overlay: string; widget: string | undefined }[] = [];

		for (const [overlayKey, overlayData] of Object.entries(data)) {
			if (overlayData.deleteAfter < now) {
				widgetsToDelete.push({ overlay: overlayKey, widget: undefined });
				continue;
			}
			for (const widgetValue of Object.values(overlayData.widgets)) {
				if (widgetValue.deleteAfter < now) {
					widgetsToDelete.push({ overlay: overlayKey, widget: widgetValue.id });
				}
			}
		}
		widgetsToDelete.forEach((entry) => {
			removeWidget(entry.overlay, entry.widget);
		});
	};

	useEffect(() => {
		deletionExpiryCheck();
	}, []);

	const removeWidget = async (overlayID: string, widgetID: string | undefined) => {
		console.log('deleting', overlayID, widgetID);
		try {
			await fetch('/api/delete', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ overlayID, widgetID }),
			}).then((response) => {
				if (!response.ok) {
					throw new Error(`Something went wrong while deleting ${widgetID}`);
				}
				// getOverlays();
			});
		} catch (error) {
			console.error(`Error removing ${widgetID}`, error);
		}
	};

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster
				position="top-center"
				duration={5000}
				richColors
				closeButton
				toastOptions={{
					classNames: {
						description: 'opacity-75 text-[12px]',
					},
				}}
			/>
			<Router>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/:id" element={<Overlay />} />
					<Route path="/trash" element={<Trash />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
