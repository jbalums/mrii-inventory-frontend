// QuantityField.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * QuantityField
 * Controlled quantity input with +/- buttons.
 *
 * Props:
 * - qty (number): controlled value
 * - setQty (function): setter for qty
 * - min (number, default 1)
 * - max (number, optional)
 * - step (number, default 1)
 * - disabled (boolean, optional)
 * - className (string, optional)
 * - onBlurCommit (function, optional): called after commit on blur/enter
 */
export default function QuantityField({
	qty,
	setQty,
	min = 1,
	max,
	step = 1,
	disabled = false,
	className = "",
	onBlurCommit,
}) {
	// Keep a local string so typing feels natural (e.g., clearing field then typing)
	const [draft, setDraft] = useState(String(qty ?? min));
	const inputRef = useRef(null);

	const hasMax = typeof max === "number" && !Number.isNaN(max);

	const clamp = (n) => {
		const safeMin = Number.isFinite(min) ? min : 0;
		let value = Number.isFinite(n) ? n : safeMin;

		if (value < safeMin) value = safeMin;
		if (hasMax && value > max) value = max;

		// For quantities, we usually want integers
		value = Math.trunc(value);

		return value;
	};

	const canDecrement = useMemo(() => {
		const safeMin = Number.isFinite(min) ? min : 0;
		return !disabled && Number(qty) > safeMin;
	}, [qty, min, disabled]);

	const canIncrement = useMemo(() => {
		if (disabled) return false;
		if (!hasMax) return true;
		return Number(qty) < max;
	}, [qty, max, hasMax, disabled]);

	// Sync draft whenever qty changes from outside (e.g., parent updates, reset, API load)
	useEffect(() => {
		const next = Number.isFinite(Number(qty)) ? String(qty) : String(min);
		setDraft(next);
	}, [qty, min]);

	const commitDraft = (raw) => {
		// Allow empty while typing, but on commit fallback to min
		if (raw === "" || raw == null) {
			const next = clamp(min);
			setQty(next);
			setDraft(String(next));
			onBlurCommit?.(next);
			return;
		}

		// Strip non-digits (keeps the component resilient for pasted text)
		const cleaned = String(raw).replace(/[^\d]/g, "");
		const parsed = cleaned === "" ? NaN : Number(cleaned);
		const next = clamp(parsed);

		setQty(next);
		setDraft(String(next));
		onBlurCommit?.(next);
	};

	const changeBy = (delta) => {
		const base = Number.isFinite(Number(qty)) ? Number(qty) : min;
		const next = clamp(base + delta);
		setQty(next);
		setDraft(String(next));
		onBlurCommit?.(next);
		// Keep focus in input for fast scanning / POS flow
		inputRef.current?.focus();
	};

	const onInputChange = (e) => {
		// Let user type freely, but keep only digits in state for simplicity
		const value = e.target.value;
		if (value === "") {
			setDraft("");
			return;
		}
		setDraft(value.replace(/[^\d]/g, ""));
	};

	const onKeyDown = (e) => {
		if (disabled) return;

		// Enter commits
		if (e.key === "Enter") {
			e.preventDefault();
			commitDraft(draft);
			inputRef.current?.blur();
			return;
		}

		// Up/Down increments/decrements
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (canIncrement) changeBy(step);
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			if (canDecrement) changeBy(-step);
			return;
		}
	};

	return (
		<div
			className={[
				"inline-flex items-center gap-2",
				disabled ? "opacity-60 cursor-not-allowed" : "",
				className,
			].join(" ")}
		>
			<div className="flex flex-col">
				<input
					ref={inputRef}
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					disabled={disabled}
					value={draft}
					onChange={onInputChange}
					onBlur={() => commitDraft(draft)}
					onKeyDown={onKeyDown}
					className={[
						"h-10 w-20 rounded-lg border border-border bg-white px-3 text-center",
						"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30",
						"disabled:bg-slate-100",
					].join(" ")}
					aria-label="Quantity"
				/>

				{/* Small helper text (optional): show constraints */}
				<div className="mt-1 text-[11px] text-slate-500 text-center leading-none">
					{hasMax ? `In stock: ${max}` : ""}
				</div>
			</div>
		</div>
	);
}
