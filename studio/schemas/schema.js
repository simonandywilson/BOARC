import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// Content Types

import seo from "./documents/seo";
import page from "./documents/page";
import landing from "./documents/landing";
import event from "./documents/event";
import domes from "./documents/domes";
import show from "./documents/show";

import homepage from "./documents/homepage";
import menu from "./documents/menu";
import faq from "./documents/faq";
import ascii from "./documents/ascii";
import files from "./documents/files";
import icons from "./documents/icons";
import borders from "./documents/borders";

// Modules

import blockHeading from "./modules/block/blockHeading";
import blockCarousel from "./modules/block/blockCarousel";
import blockImg from "./modules/block/blockImg";
import blockCollapsible from "./modules/block/blockCollapsible";
import blockFile from "./modules/block/blockFile";
import blockInternal from "./modules/block/blockInternal";
import blockExternal from "./modules/block/blockExternal";
import blockComment from "./modules/block/blockComment";

import blockEvent from "./modules/block/blockEvent";

import img from "./modules/img";

import pageBlock from "./modules/pageBlock";
import faqBlock from "./modules/faqBlock";
import basicBlock from "./modules/basicBlock";
import programmeBlock from "./modules/programmeBlock";

export default createSchema({
    name: "default",
    types: schemaTypes.concat([
        // Content Types
        homepage,
        menu,
        seo,

        page,
        landing,
        event,
        domes,
        show,

        faq,
        ascii,
        files,
        icons,
        borders,

        // Block
        blockHeading,
        blockCarousel,
        blockImg,
        blockCollapsible,
        blockFile,
        blockInternal,
        blockExternal,
        blockComment,
        blockEvent,

        // Module
        img,

        pageBlock,
        faqBlock,
        basicBlock,
        programmeBlock,
    ]),
});
