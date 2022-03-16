import React from "react";
import * as style from "./sketch.module.css";
const Canvas = React.lazy(() => import("react-p5"));

let grid = 8;

const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background("rgba(0,255,0, 0)");
};

const draw = (p5) => {
    if (p5.mouseIsPressed) {
        var x = snap(p5.mouseX);
        var y = snap(p5.mouseY);
        p5.noStroke();
        p5.fill(0);
        p5.square(x, y, grid);
    }
};

const snap = (mousePos) => {
    var cell = Math.round((mousePos - grid / 2) / grid);
    return cell * grid;
};

const Sketch = () => {
    const isSSR = typeof window === "undefined";
    return (
        <>
            {!isSSR && (
                <React.Suspense fallback={<div />}>
                    <div className={style.sketch}>
                        <Canvas setup={setup} draw={draw} />
                    </div>
                </React.Suspense>
            )}
        </>
    );
};

export default Sketch;
