import '../App.css';

interface Props {
	children: React.ReactNode;
}

const Overlay = ({ children }: Props) => {
	return <div className="overlay">{children}</div>;
};

export default Overlay;
