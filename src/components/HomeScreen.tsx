import { Link } from 'react-router-dom';
import '../App.css';

const HomeScreen = () => {
  return (
    <>
        <div>HomeScreen</div>
        <Link to={`/overlay/overlay-1`}>Overlay 1</Link>
        <Link to={`/overlay/overlay-2`}>Overlay 2</Link>
    </>
  )
}

export default HomeScreen