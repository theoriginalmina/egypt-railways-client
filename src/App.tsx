import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

const App:React.FC = () => {
	document.title = "Egypt Railways | Home"
	return (
		<div className="App">
			<Navbar />
		</div>
	);
}

export default App;
