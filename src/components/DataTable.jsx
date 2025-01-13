import { Edit2, Eye } from "lucide-react";
import Card from "./ui/Card";
import CardHeader from "./ui/CardHeader";
import CardTitle from "./ui/CardTitle";
import CardContent from "./ui/CardContent";
import Button from "./ui/Button";
import FormatDate from "../utils/FormatDate";

const DataTable = ({ groupedData, onView, onEdit }) => {
	return (
		<div className="space-y-6">
			{Object.entries(groupedData).map(([yearMonth, transactions]) => (
				<Card key={yearMonth} className="overflow-hidden text-black">
					<CardHeader className="bg-slate-50">
						<CardTitle className="text-lg">{yearMonth}</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full table-auto">
								<thead className="text-center">
									<tr className="border-b">
										{[
											"ID",
											"Product",
											"Customer",
											"Amount",
											"Status",
											"Date",
											"Actions",
										].map((header) => (
											<th key={header} className="w-1/7">
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="text-center">
									{transactions.map((item) => (
										<tr key={item.id} className="border-b hover:bg-slate-50">
											<td className="w-[5%]">{item.id}</td>
											<td className="w-[15%]">{item.productName}</td>
											<td className="w-[25%]">{item.customerName}</td>
											<td className="w-[10%]">
												${Number(item.amount).toLocaleString()}
											</td>
											<td className="w-[15%]">
												<span
													className={`px-2 py-1 rounded-full text-sm ${
														item.status === 0
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}>
													{item.status === 0 ? "SUCCESS" : "FAILED"}
												</span>
											</td>
											<td className="w-[20%]">
												{FormatDate(item.transactionDate)}
											</td>
											<td className="w-[20%]">
												<div className="flex justify-center gap-2">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => onView(item)}>
														<Eye className="w-4 h-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => onEdit(item)}>
														<Edit2 className="w-4 h-4" />
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default DataTable;
