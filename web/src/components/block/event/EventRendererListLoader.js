import React, { useEffect, useState } from "react";
import * as style from "./list.module.css";

const EventRendererListLoader = ({ width }) => {
	const [timeout, setTimeout] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setTimeout(true);
		}, 3000);
	}, []);

	return (
		<div className={style.grid}>
			<div
				className={style.row}
				style={{
					gridColumn: width === "wide" ? "var(--grid-position-main-wide)" : "var(--grid-position-main-normal)",
				}}>
				<div className={style.loader}>
					{timeout ? (
						<span>No events</span>
					) : (
						<span>
							Loading Events <span className={style.spinner}></span>
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventRendererListLoader;
