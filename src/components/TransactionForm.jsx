import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./ui/Button";
import { Plus, Pencil } from "lucide-react";
import {
	fetchTransactionById,
	insertTransaction,
	updateTransaction,
} from "../utils/Supabase";

const TransactionForm = () => {
	const [formData, setFormData] = useState({
		productID: "",
		productName: "",
		amount: "",
		customerName: "",
		status: 0,
		transactionDate: "",
		createBy: "",
		createOn: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			const fetchTransactionData = async () => {
				try {
					const data = await fetchTransactionById(id);
					const date = new Date(data.transactionDate);
					const formattedDate = date.toISOString().slice(0, 16);

					setFormData({
						productID: data.productID,
						productName: data.productName,
						amount: data.amount,
						customerName: data.customerName,
						status: data.status,
						transactionDate: formattedDate,
						createBy: data.createBy,
					});
					setIsEditing(true);
				} catch (err) {
					setError(err.message);
				}
			};

			fetchTransactionData();
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEditing) {
				await updateTransaction(id, {
					...formData,
					createOn: new Date().toISOString(),
				});
			} else {
				await insertTransaction({
					...formData,
					createOn: new Date().toISOString(),
				});
			}
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="p-6 mx-auto max-w-7xl">
			<h1 className="text-2xl font-bold">
				{isEditing ? "Edit Transaction" : "Add Transaction"}
			</h1>
			{error && <p className="text-red-500">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block">Product ID</label>
					<input
						type="text"
						name="productID"
						value={formData.productID}
						onChange={handleChange}
						required
						className="w-full p-2 border"
					/>
				</div>
				<div>
					<label className="block">Product Name</label>
					<input
						type="text"
						name="productName"
						value={formData.productName}
						onChange={handleChange}
						required
						className="w-full p-2 border"
					/>
				</div>
				<div>
					<label className="block">Amount</label>
					<input
						type="number"
						name="amount"
						value={formData.amount}
						onChange={handleChange}
						required
						className="w-full p-2 border"
					/>
				</div>
				<div>
					<label className="block">Customer Name</label>
					<input
						type="text"
						name="customerName"
						value={formData.customerName}
						onChange={handleChange}
						required
						className="w-full p-2 border"
					/>
				</div>
				<div>
					<label className="block">Status</label>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="w-full p-2 border">
						<option value="0">SUCCESS</option>
						<option value="1">FAILED</option>
					</select>
				</div>
				<div>
					<label className="block">Transaction Date</label>
					<input
						type="datetime-local"
						name="transactionDate"
						value={formData.transactionDate}
						onChange={handleChange}
						required
						className="w-full p-2 border"
					/>
				</div>
				<div>
					<label className="block">Created By</label>
					<input
						type="text"
						name="createBy"
						value={formData.createBy}
						onChange={handleChange}
						required
						className="w-full p-2 border"
					/>
				</div>
				<div className="flex justify-between">
					<Button
						type="button"
						variant="ghost"
						onClick={() => navigate("/")}
						className="p-2 bg-gray-300">
						Cancel
					</Button>
					<Button type="submit">
						{isEditing ? (
							<Pencil className="w-4 h-4 mr-2" />
						) : (
							<Plus className="w-4 h-4 mr-2" />
						)}
						{isEditing ? "Update Transaction Data" : "Add Transaction Data"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default TransactionForm;
