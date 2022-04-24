import { nanoid } from "nanoid";

const getDefaultState = (offset, width) => ({
    elements: [
        {
            id: nanoid(),
            index: 0,
            height: 0,
            start: false,
            offset: offset,
            rect: null,
            prevRect: null,
        },
    ],
    width,
    height: 0,
});

export default getDefaultState;
