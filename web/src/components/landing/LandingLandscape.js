import React from 'react'
import * as style from "./landingLandscape.module.css";
import { Link } from "gatsby";
import { nanoid } from "nanoid";

const LandingLandscape = ({pages, rows}) => {
  return (
      <div className={style.landing}>
          <div className={style.container}>
              <div
                  className={style.landingTextGrid}
                  style={{
                      gridTemplateColumns: "repeat(1, auto)",
                      gridTemplateRows: `repeat(${pages.length}, auto)`,
                  }}
              >
                  {pages.map((page, index) => {
                      const title = page.landingTitle ? [...page.landingTitle] : [...page.title];
                      const titlePosition = page.landingTitlePosition
                          ? page.landingTitlePosition
                          : 1;
                      const description = page.landingDescription
                          ? [...page.landingDescription]
                          : [..."No description"];
                      const descriptionPosition = page.landingDescriptionPosition
                          ? page.landingDescriptionPosition
                          : 1;
                      return (
                          <div
                              key={page._id + index}
                              className={style.landingTextRow}
                              style={{
                                  gridTemplateColumns: "repeat(45, 1fr)",
                                  gridTemplateRows: `repeat(4, 1fr)`,
                              }}
                          >
                              <div
                                  className={style.landingTextTitle}
                                  style={{
                                      gridColumn: `${titlePosition} / span 45`,
                                      gridTemplateColumns: `repeat(${title.length}, max-content)`,
                                  }}
                              >
                                  <Link to={`/${page.slug.current}`}>
                                      {title.map((text) => (
                                          <span key={nanoid()}>{text}</span>
                                      ))}
                                  </Link>
                              </div>
                              <div
                                  className={style.landingTextDescription}
                                  style={{
                                      gridColumn: `${descriptionPosition} / span 45`,
                                      gridTemplateColumns: `repeat(${
                                          46 - descriptionPosition
                                      }, 1fr)`,
                                  }}
                              >
                                  {description.map((text) => (
                                      <span key={nanoid()}>{text}</span>
                                  ))}
                              </div>
                          </div>
                      );
                  })}
              </div>
              <div
                  className={style.landingDots}
                  style={{
                      gridTemplateColumns: "repeat(45, auto)",
                      gridTemplateRows: `repeat(${rows}, auto)`,
                  }}
              >
                  {[...Array(45 * rows)].map(() => (
                      <span key={nanoid()}>.</span>
                  ))}
              </div>
          </div>
      </div>
  );
}

export default LandingLandscape