import React from "react";
import { Card } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderBorder.css";

export const RenderBorder = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue, document } = props;
    const borderTop = document.borderTop ? document.borderTop.repeat(60) : "";
    const borderBottom = document.borderBottom ? document.borderBottom.repeat(60) : "";
    return (
        <div>
            {document.borderTop || document.borderBottom ? (
                <FormField
                    description={type.description}
                    title={type.title}
                    __unstable_markers={markers}
                    __unstable_presence={presence}
                    compareValue={compareValue}
                >
                    <Card padding={[2, 2, 2, 2]} shadow={1} ref={ref}>
                        <div className={style.container}>
                            <div className={style.border}>{borderTop}</div>
                            <span className={style.heading}>{document.name}</span>
                            <div className={style.border}>{borderBottom}</div>
                        </div>
                    </Card>
                </FormField>
            ) : (
                <div></div>
            )}
        </div>
    );
});

export default withDocument(RenderBorder);
