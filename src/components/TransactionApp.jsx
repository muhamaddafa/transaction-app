import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Button from "./ui/Button";
import DataTable from "./DataTable";
import TransactionDetails from "./TransactionDetails";
import { useNavigate } from "react-router-dom";
import { fetchTransactions } from "../utils/Supabase";
import GetYearMonth from "../utils/GetYearMonth";

const TransactionApp = () => {
	const navigate = useNavigate();
	const [transactions, setTransactions] = useState([]);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [isViewing, setIsViewing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTransactionsData = async () => {
			setLoading(true);
			try {
				const data = await fetchTransactions();
				setTransactions(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTransactionsData();
	}, []);

	const groupTransactions = (transactions) => {
		const grouped = transactions.reduce((acc, transaction) => {
			const yearMonth = GetYearMonth(transaction.transactionDate);
			if (!acc[yearMonth]) {
				acc[yearMonth] = [];
			}
			acc[yearMonth].push(transaction);
			return acc;
		}, {});

		const sortedKeys = Object.keys(grouped).sort((a, b) => {
			const [monthA, yearA] = a.split(" ");
			const [monthB, yearB] = b.split(" ");
			const monthIndexA = new Date(Date.parse(monthA + " 1")).getMonth();
			const monthIndexB = new Date(Date.parse(monthB + " 1")).getMonth();
			return yearB - yearA || monthIndexB - monthIndexA;
		});

		const sortedGrouped = {};
		sortedKeys.forEach((key) => {
			sortedGrouped[key] = grouped[key];
		});

		return sortedGrouped;
	};

	const groupedTransactions = groupTransactions(transactions);

	const handleView = (transaction) => {
		setSelectedTransaction(transaction);
		setIsViewing(true);
	};

	const handleAdd = () => {
		navigate("/transaction/new");
	};

	const handleEdit = (transaction) => {
		navigate(`/transaction/edit/${transaction.id}`);
	};

	return (
		<div className="p-6 mx-auto max-w-7xl">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Transactions</h1>
				<Button onClick={handleAdd}>
					<Plus className="w-4 h-4 mr-2" />
					Add Transaction
				</Button>
			</div>

			{loading && <p>Loading transactions...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{!loading && !error && (
				<DataTable
					groupedData={groupedTransactions}
					onView={handleView}
					onEdit={handleEdit}
				/>
			)}

			{isViewing && (
				<TransactionDetails
					selectedTransaction={selectedTransaction}
					setIsViewing={setIsViewing}
				/>
			)}
		</div>
	);
};

export default TransactionApp;
