import React, { useCallback, useRef, useState, useEffect } from "react";
import PatchEvent, { set } from "@sanity/form-builder/PatchEvent";
import { withDocument } from "part:@sanity/form-builder";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";
import { Card, Stack, Box } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import * as style from "./colour.module.css";
import { nanoid } from "nanoid";
import useDebounce from "../../functions/useDebounce";

export const RenderColourSimple = React.forwardRef((props, ref) => {
    const { type, value, markers, presence, compareValue, onFocus, onBlur, onChange } =
        props;

    const popover = useRef();
    const [colour, setColour] = useState(
        value ? value : type?.options?.defaultColour ? type.options.defaultColour : "#ffffff"
    );
    const [isOpen, toggle] = useState(false);
    const debouncedColour = useDebounce(colour, 1000);
    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);
    const inputId = nanoid();

    useEffect(() => {
        onChange(PatchEvent.from(set(colour)));
    }, [debouncedColour]);

    return (
        <FormField
            description={type.description}
            title={type.title}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
            inputId={inputId}
        >
            <Card padding={[4, 4, 4, 4]} shadow={1} radius={2}>
                <Stack space={[3, 3, 4]}>
                    <Box padding={[2, 2, 2, 2]} radius={2} display={"flex"} className={style.card}>
                        <Card marginRight={3}>
                            <div className={style.picker}>
                                <div
                                    className={style.swatch}
                                    style={{ backgroundColor: colour }}
                                    onClick={() => toggle(true)}
                                />
                                {isOpen && (
                                    <div className={style.popover} ref={popover}>
                                        <HexColorPicker color={colour} onChange={setColour} />
                                    </div>
                                )}
                            </div>
                        </Card>
                        <Card flex={3}>
                            <div className={style.input}>
                                <span>
                                    <HexColorInput
                                        color={colour}
                                        onChange={setColour}
                                        className={style.text}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        ref={ref}
                                        inputId={inputId}
                                    />
                                    <span className={style.border}></span>
                                </span>
                            </div>
                        </Card>
                    </Box>
                </Stack>
            </Card>
        </FormField>
    );
});

export default withDocument(RenderColourSimple);
