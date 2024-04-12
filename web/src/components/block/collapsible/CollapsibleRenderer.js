import React, { useState, useMemo } from "react";
import * as style from "./collapsible.module.css";
import { PortableText } from "@portabletext/react";
import TextRendererCollapsible from "./TextRendererCollapsible";

const CollapsibleRenderer = ({ value, width, background }) => {
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
			<div
				className={style.collapsible}
				style={{
					gridColumn: width === "wide" ? "var(--grid-position-main-wide)" : "var(--grid-position-main-normal)",
				}}>
				<div className={style.wrapper}>
					<span className={style.icon}>{isExpanded ? "–" : "+"}&nbsp;</span>
					<div className={style.content}>
						<summary
							onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
							className={style.button}>
							{value.title}
						</summary>
						<div
							className={style.text}
							>
							<PortableText
								value={value.text}
								components={serialiser}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollapsibleRenderer;
