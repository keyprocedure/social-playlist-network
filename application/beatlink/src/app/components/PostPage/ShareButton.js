import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import "../css/ShareButton.css";
import { IconButton } from "../IconButton";

export default function ShareButton({ width, height }) {
	const [show, setShow] = React.useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setShow(false), 2000);
		return () => clearTimeout(timeout);
	}, [show]); // add show back here when done

	function handleClick() {
		// console.log("Share button clicked");
		const currentURL = window.location.href;
		console.log("Current URL: ", currentURL);

		console.log("Show: ", show);
		if (currentURL) {
			navigator.clipboard.writeText(currentURL);
			setShow(true);
		}

		if (show) {
			setShow(false);
		}
	}

	return (
		<div>
			<IconButton
				icon={<ShareIcon width={width} height={height} />}
				onClick={handleClick}
			/>
			<div className="alert-container">
				{show && (
					<Alert
						className="alert alert-dark"
						variant="success"
						transition={true}
						dismissible={true}
						onClick={handleClick}>
						URL copied to clipboard
					</Alert>
				)}
			</div>
		</div>
	);
}

function ShareIcon({ width, height }) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M13.2722 4.00791C13.6191 4.60134 14.263 5 15 5C16.1046 5 17 4.10457 17 3C17 1.89543 16.1046 1 15 1C13.8954 1 13 1.89543 13 3C13 3.36756 13.0991 3.71195 13.2722 4.00791ZM13.2722 4.00791L4.72784 8.99209M4.72784 8.99209C4.38092 8.39866 3.73701 8 3 8C1.89543 8 1 8.89543 1 10C1 11.1046 1.89543 12 3 12C3.73701 12 4.38092 11.6013 4.72784 11.0079M4.72784 8.99209C4.90085 9.28805 5 9.63244 5 10C5 10.3676 4.90085 10.712 4.72784 11.0079M4.72784 11.0079L13.2722 15.9921M13.2722 15.9921C13.6191 15.3987 14.263 15 15 15C16.1046 15 17 15.8954 17 17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17C13 16.6324 13.0991 16.288 13.2722 15.9921Z"
				stroke="black"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
