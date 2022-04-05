import React from "react";
import * as style from "./ascii.module.css";
import { useStaticQuery, graphql } from "gatsby";
import { nanoid } from "nanoid";
import { useAsciiContext } from "../../state/GlobalState";

const Ascii = () => {
    const { homepage: ascii } = useStaticQuery(getData);
    const AsciiContext = useAsciiContext();
    return (
        <header className={style.grid} style={{ display: AsciiContext === true ? "grid" : "none" }}>
            <div className={style.ascii}>
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
