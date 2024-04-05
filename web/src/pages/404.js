import * as React from "react";
import { Link } from "gatsby";
import * as style from "../styles/404.module.css";

const NotFoundPage = () => {
    return (
        <main className={style.container}>
            <div>PAGE NOT FOUND</div>
            <br />
            <div>
                <span className={style.spinner}></span>
            </div>
            <br />
            <Link to={"/"}>Return Home?</Link>
        </main>
    );
};

export default NotFoundPage;
