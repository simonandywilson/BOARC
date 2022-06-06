import React, { useState, useEffect } from "react";
import { Card, Stack, Select } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import { useId } from "@reach/auto-id";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const GetHeadings = React.forwardRef((props, ref) => {
    const [data, setData] = useState([]);

    const {
        type,
        value,
        readOnly,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur,
        onChange,
        parent,
    } = props;

    const handleChange = React.useCallback(
        (event) => {
            const inputValue = event.currentTarget.value;
            onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
        },
        [onChange]
    );

    const inputId = useId();

    const target = parent?.reference?._ref;

    useEffect(() => {
        let toFetch = true;
        if (target && toFetch) {
            const fetchData = async () => {
                const data = await client
                    .fetch(`*[_id == $targetId][0] {content[_type match $variant] {heading}}`, {
                        targetId: target,
                        variant: "blockHeading",
                    })
                    .then((res) =>
                        res.content.map(({ heading }) => ({
                            title: heading,
                            value: heading.toLowerCase().split(" ").join("-"),
                        }))
                    );
                setData(data);
            };
            fetchData();
        }
        return () => (toFetch = false);
    }, [target]);

    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
            inputId={inputId}
        >
            <Card padding={0}>
                <Stack>
                    <Select
                        id={inputId}
                        fontSize={2}
                        padding={[3, 3, 4]}
                        space={[3, 3, 4]}
                        value={value}
                        readOnly={readOnly}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        ref={ref}
                        onChange={handleChange}
                    >
                        <option value={""}>Top of Page</option>
                        {data.map(({ title, value }) => (
                            <option key={value} value={value}>
                                {title}
                            </option>
                        ))}
                    </Select>
                </Stack>
            </Card>
        </FormField>
    );
});

export default GetHeadings;
