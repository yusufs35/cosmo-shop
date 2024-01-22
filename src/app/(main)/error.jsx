"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="h-100 d-flex  align-items-center justify-content-center text-center">
			<div>
				<h2>Something went wrong!</h2>
				<Button
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
				>
					Try again
				</Button>
			</div>
		</div>
	);
}
