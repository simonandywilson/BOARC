import React from 'react'
import * as style from "./decoration.module.css"
import Image from "gatsby-plugin-sanity-image";

const Decoration = ({hasAscii, images}) => {
  return (
      <div
          className={style.decoration}
          style={{
              transform: hasAscii
                  ? "translateY(calc((var(--ascii-height) * -1) + ((var(--margin) + var(--margin-half)) * -1)))"
                  : 0,
          }}
      >
          {images.map((image, index) => (
              <div className={style.grid} key={image.asset._id}>
                  <Image
                      {...image}
                      className={style.decorationImage}
                      alt=""
                      width={1000}
                      style={{ gridColumn: index % 2 === 0 ? "10 / 12" : "1 / 4" }}
                  />
              </div>
          ))}
      </div>
  );
}

export default Decoration