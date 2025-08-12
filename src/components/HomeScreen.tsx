import { Link } from 'react-router-dom';
import '../App.css';
import { useEffect, useState } from 'react';
import type { WidgetInstance } from '../types/widget';

interface overlay{
  name: string,
  id: string,
  widgets: WidgetInstance[]
}

const HomeScreen = () => {
  const [overlays, setOverlays] = useState<overlay[]>([]);
  
  useEffect(() => {
		const getOverlays = async () => {
			const res = await fetch('/api/get-overlays');
			const data = await res.json();
			setOverlays(data);
		};
		getOverlays();
  }, []);

  return (
    <>
        <div>HomeScreen</div>
        {overlays.map((overlay: overlay) => {
          return <Link key={overlay.id} to={`/${overlay.id}`}>{overlay.name}</Link>
        })}
    </>
  )
}

export default HomeScreen