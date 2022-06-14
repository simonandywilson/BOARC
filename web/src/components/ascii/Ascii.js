import React, { useState, useEffect } from "react";
import * as style from "./ascii.module.css";
import { useStaticQuery, graphql } from "gatsby";
import { nanoid } from "nanoid";
import { useAsciiContext } from "../../state/GlobalState";
import { useResizeDetector } from "react-resize-detector";
import Ticker from "./ticker/Ticker";
import PageVisibility from "react-page-visibility";

const Ascii = ({ asciiWidth }) => {
    const { homepage: ascii } = useStaticQuery(getData);
    const AsciiContext = useAsciiContext();
    const { height, width, ref } = useResizeDetector();
    const [pageIsVisible, setPageIsVisible] = useState(true);

    useEffect(() => {
        const resizeEvent = new Event("resize");
        window.dispatchEvent(resizeEvent);
    }, []);

    useEffect(() => {
        if (height && height > 0) {
            document.documentElement.style.setProperty("--ascii-height", `${height}px`);
        }
    }, [height, width]);

    const handleVisibilityChange = (isVisible) => setPageIsVisible(isVisible);

    return (
        AsciiContext && (
            <header
                className={style.ascii}
                style={{
                    width: asciiWidth,
                    height: "var(--ascii-height)",
                }}
            >
                <div className={style.container}>
                    <PageVisibility onChange={handleVisibilityChange}>
                        {pageIsVisible && (
                            <Ticker speed={5}>
                                {() => (
                                    <div className={style.wrapper} ref={ref}>
                                        {ascii.ascii.map((asc) => {
                                            return (
                                                <table className={style.table} key={asc._id}>
                                                    <tbody>
                                                        {asc.characterLayout.rows.map((row) => (
                                                            <tr key={row._key}>
                                                                {row.cells.map((cell) => {
                                                                    const character =
                                                                        cell === ""
                                                                            ? "\u00a0"
                                                                            : cell;
                                                                    return (
                                                                        <td key={nanoid()}>
                                                                            {character}
                                                                        </td>
                                                                    );
                                                                })}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            );
                                        })}
                                    </div>
                                )}
                            </Ticker>
                        )}
                    </PageVisibility>
                </div>
            </header>
        )
    );
};

export default Ascii;

const getData = graphql`
    {
        homepage: sanityHomepage {
            ascii {
                _id
                characterLayout {
                    _key
                    rows {
                        _key
                        cells
                    }
                }
            }
        }
    }
`;
