import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomeScreenSidebar = () => {
  return (
    <div className="home-screen-sidebar h-screen flex flex-col py-8 min-w-20 items-center justify-between">
        <div className="home-screen-sidebar-logo flex items-top justify-center">
            <Link to="/"><Button variant="ghost" size="icon"><i className="bi bi-house text-lg"></i></Button></Link>
        </div>
        <div className="home-screen-sidebar-buttons flex flex-col gap-2">
            <ThemeToggle />
            <Link to="/trash"><Button variant="ghost" size="icon"> <i className="bi bi-trash3"></i> </Button></Link>
            <Button variant="ghost" size="icon"> <i className="bi bi-gear-wide"></i> </Button>
        </div>
    </div>
  )
}

export default HomeScreenSidebar