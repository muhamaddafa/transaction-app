import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qpfcozftklvtphfliihk.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZmNvemZ0a2x2dHBoZmxpaWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NzA0MjUsImV4cCI6MjA1MjM0NjQyNX0.MP2n7u19R5Rk-9UH6Rx60G97IKnMBHvfTzfF9rNMtb0";
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchTransactions = async () => {
	const { data, error } = await supabase.from("data").select("*");
	if (error) throw error;
	return data;
};

export const fetchTransactionById = async (id) => {
	const { data, error } = await supabase
		.from("data")
		.select("*")
		.eq("id", id)
		.single();
	if (error) throw error;
	return data;
};

export const insertTransaction = async (transaction) => {
	const { data, error } = await supabase.from("data").insert([transaction]);
	if (error) throw error;
	return data;
};

export const updateTransaction = async (id, updates) => {
	const { data, error } = await supabase
		.from("data")
		.update(updates)
		.eq("id", id);
	if (error) throw error;
	return data;
};

export const deleteTransaction = async (id) => {
	const { data, error } = await supabase.from("data").delete().eq("id", id);
	if (error) throw error;
	return data;
};

export default supabase;
