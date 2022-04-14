import React from 'react'
import * as style from "./list.module.css";


const EventRendererListLoader = ({width}) => {
  return (
      <div className={style.grid}>
          <div
              className={style.row}
              style={{
                  gridColumn:
                      width === "wide"
                          ? "var(--grid-position-main-wide)"
                          : "var(--grid-position-main-normal)",
              }}
          >
              <div className={style.loader}>
                  <span>
                      Loading Events <span className={style.spinner}></span>
                  </span>
              </div>
          </div>
      </div>
  );
}

export default EventRendererListLoader