import React, { useState, useMemo } from "react";
import * as style from "./collapsibleFeatured.module.css";
import { PortableText } from "@portabletext/react";
import TextRendererCollapsible from "./TextRendererCollapsible";

const CollapsibleFeaturedRenderer = ({ value, width, background }) => {
	const [isExpanded, setExpanded] = useState(false);

	const serialiser = useMemo(() => {
		const components = {
			block: (data) => (
				<TextRendererCollapsible
					data={data}
					background={background}
				/>
			),
		};
		return components;
	}, []);
	return (
		<div className={style.grid}>
			<details
				className={style.collapsible}
				style={{
					gridColumn: width === "wide" ? "var(--grid-position-main-wide)" : "var(--grid-position-main-normal)",
				}}>
				<summary
					className={style.featured}
					onClick={() => setExpanded((prevState) => !prevState)}>
					<div className={style.icon}>{value.icon?.character ? value.icon.character : "A"}</div>
					<div>
						<div>{value.title}</div>
						<span className={style.read}>
							{isExpanded ? "–" : "+"} read {isExpanded ? "less" : "more"}
						</span>
					</div>
				</summary>
				<div className={style.text}>
					<PortableText
						value={value.text}
						components={serialiser}
					/>
				</div>
			</details>
		</div>
	);
};

export default CollapsibleFeaturedRenderer;
