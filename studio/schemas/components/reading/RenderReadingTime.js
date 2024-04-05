import React, { useState, useMemo, useEffect } from "react";
import { Card, Stack, Inline, Badge } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import { useReadingTime } from "react-hook-reading-time";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

export const RenderReadingTime = React.forwardRef((props, ref) => {
    const { type, document } = props;
    const [time, setTime] = useState(null);

    const valid = useMemo(() => {
        const validate =
            (type.options?.target !== undefined &&
                document[type.options?.target] !== undefined &&
                document[type.options?.fieldName] !== undefined &&
                Array.isArray(document[type.options?.target])) ||
            Object.prototype.toString.call(document[type.options?.target]) === "[object String]";
        
        const targetType = validate
            ? Array.isArray(document[type.options?.target])
                ? "block"
                : "string"
            : false;
        
        return targetType;
    }, []);

    useEffect(() => {
        if (document._id) {
            client
                .patch(document._id)
                .set({ reading: time?.words && valid !== false ? time.text : "" })
                .commit()
                .catch((err) => console.error("The update to 'reading' failed: ", err.message));
        }
    }, [time]);

    return (
        <FormField description={type.description} title={type.title}>
            <Card padding={[3, 3, 3, 3]} shadow={1} radius={2} ref={ref}>
                <Stack space={[3, 3, 3]}>
                    {valid !== false ? (
                        <RenderReadingTimePatch
                            document={document}
                            type={type}
                            valid={valid}
                            time={time}
                            setTime={setTime}
                        />
                    ) : (
                        <Inline space={2}>
                            <Badge tone={"critical"}>Invalid or missing target/fieldName</Badge>
                        </Inline>
                    )}
                </Stack>
            </Card>
        </FormField>
    );
});

const RenderReadingTimePatch = ({ document, type, valid, time, setTime }) => {
    const debouncedInput = useDebounce(document[type.options.target], 1000);

    useEffect(() => {
        if (valid === "block") {
            const filteredBlock = document[type.options.target]
                .filter((x) => x._type === "block")
                .map((children) => children.children.map((texts) => texts.text));
            setTime(useReadingTime(filteredBlock.join(" ")));
        } else {
            setTime(useReadingTime(useReadingTime(document[type.options.target])));
        }
    }, [debouncedInput]);

    return (
        <div>
            {time && (
                <Inline space={2}>
                    <Badge tone={"primary"}>{time.text}</Badge>
                    <Badge>{`${time.words} words`}</Badge>
                </Inline>
            )}
        </div>
    );
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

export default withDocument(RenderReadingTime);