import React, {useEffect} from "react";
import * as style from "./ascii.module.css";
import { useStaticQuery, graphql } from "gatsby";
import { nanoid } from "nanoid";
import { useAsciiContext } from "../../state/GlobalState";
import { useResizeDetector } from "react-resize-detector";

const Ascii = ({ asciiWidth }) => {
    const { homepage: ascii } = useStaticQuery(getData);
    const AsciiContext = useAsciiContext();
    const { height, ref } = useResizeDetector();
    
    useEffect(
        () => document.documentElement.style.setProperty("--ascii-height", `${height}px`),
        [height]
    );

    return (
        <header
            className={style.ascii}
            style={{ width: asciiWidth, height: height, display: AsciiContext === true ? "inline-block" : "none" }}
        >
            <div className={style.wrapper}>
                <div className={style.flex} ref={ref}>
                    {ascii.ascii.map((asc) => {
                        return (
                            <table className={style.table} key={asc._id}>
                                <tbody>
                                    {asc.characterLayout.rows.map((row) => (
                                        <tr key={row._key}>
                                            {row.cells.map((cell) => (
                                                <td key={nanoid()}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );
                    })}
                </div>
            </div>
            <div className={style.wrapper}>
                <div className={style.flex}>
                    {ascii.ascii.map((asc) => {
                        return (
                            <table className={style.table} key={asc._id}>
                                <tbody>
                                    {asc.characterLayout.rows.map((row) => (
                                        <tr key={row._key}>
                                            {row.cells.map((cell) => (
                                                <td key={nanoid()}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );
                    })}
                </div>
            </div>
            <div className={style.wrapper}>
                <div className={style.flex}>
                    {ascii.ascii.map((asc) => {
                        return (
                            <table className={style.table} key={asc._id}>
                                <tbody>
                                    {asc.characterLayout.rows.map((row) => (
                                        <tr key={row._key}>
                                            {row.cells.map((cell) => (
                                                <td key={nanoid()}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );
                    })}
                </div>
            </div>
            <div className={style.wrapper}>
                <div className={style.flex}>
                    {ascii.ascii.map((asc) => {
                        return (
                            <table className={style.table} key={asc._id}>
                                <tbody>
                                    {asc.characterLayout.rows.map((row) => (
                                        <tr key={row._key}>
                                            {row.cells.map((cell) => (
                                                <td key={nanoid()}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );
                    })}
                </div>
            </div>
            <div className={style.wrapper}>
                <div className={style.flex}>
                    {ascii.ascii.map((asc) => {
                        return (
                            <table className={style.table} key={asc._id}>
                                <tbody>
                                    {asc.characterLayout.rows.map((row) => (
                                        <tr key={row._key}>
                                            {row.cells.map((cell) => (
                                                <td key={nanoid()}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );
                    })}
                </div>
            </div>
        </header>
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
