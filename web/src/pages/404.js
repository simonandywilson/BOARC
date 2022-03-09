import * as React from "react";
import { Link } from "gatsby";
import * as style from "../styles/404.module.css";

const NotFoundPage = () => {
    return (
        <main className={style.container}>
            <Link to="/">
                <div className={style.wrapper}>
                    <h4 className={style.text}>Page Not Found.<br/>Return Home?</h4>
                </div>
            </Link>
        </main>
    );
};

export default NotFoundPage;
