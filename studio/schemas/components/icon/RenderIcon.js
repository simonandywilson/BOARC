import React from "react";
import { Card, Flex } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./icon.module.css";

export const RenderIcon = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue, document } = props;
    return (
        <div>
            {document.character ? (
                <FormField
                    description={type.description}
                    title={type.title}
                    __unstable_markers={markers}
                    __unstable_presence={presence}
                    compareValue={compareValue}
                >
                    <Card padding={[1, 1, 1, 1]} shadow={1} ref={ref}>
                        <Flex align={"center"} justify={"center"}>
                            <h1 className={style.icon}>{document.character}</h1>
                        </Flex>
                    </Card>
                </FormField>
            ) : (
                <div></div>
            )}
        </div>
    );
});

export default withDocument(RenderIcon);
