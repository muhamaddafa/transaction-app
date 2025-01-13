import Card from "./ui/Card";
import CardHeader from "./ui/CardHeader";
import CardTitle from "./ui/CardTitle";
import CardContent from "./ui/CardContent";
import Button from "./ui/Button";
import FormatDate from "../utils/FormatDate";

const TransactionDetails = ({ selectedTransaction, setIsViewing }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<CardTitle>View Transaction</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{Object.entries({
							ID: selectedTransaction.id,
							Product: selectedTransaction.productName,
							Customer: selectedTransaction.customerName,
							Amount: `$${Number(selectedTransaction.amount).toLocaleString()}`,
							Status: (
								<span
									className={`px-2 py-1 rounded-full text-sm ${
										selectedTransaction.status === 0
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}>
									{selectedTransaction.status === 0 ? "SUCCESS" : "FAILED"}
								</span>
							),
							"Transaction Date": FormatDate(
								selectedTransaction.transactionDate
							),
							"Created By": selectedTransaction.createBy,
							"Created On": FormatDate(selectedTransaction.createOn),
						}).map(([key, value]) => (
							<div key={key}>
								<span className="font-semibold">{key}:</span> {value}
							</div>
						))}
					</div>
					<Button className="mt-4" onClick={() => setIsViewing(false)}>
						Close
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default TransactionDetails;
