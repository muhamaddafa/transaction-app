import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionApp from "./components/TransactionApp";
import TransactionForm from "./components/TransactionForm";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<TransactionApp />} />
				<Route path="/transaction/new" element={<TransactionForm />} />
				<Route path="/transaction/edit/:id" element={<TransactionForm />} />
			</Routes>
		</Router>
	);
};

export default App;
