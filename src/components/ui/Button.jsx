const Button = ({
	children,
	variant = "default",
	size = "default",
	className = "",
	...props
}) => {
	const baseStyles =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors";
	const variants = {
		default: "bg-slate-900 text-white hover:bg-slate-800",
		ghost: "hover:bg-slate-100 text-slate-900",
	};
	const sizes = {
		default: "h-10 py-2 px-4",
		icon: "h-9 w-9",
	};

	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
