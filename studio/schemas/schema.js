import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// Content Types

import seo from "./documents/seo";
import page from "./documents/page";
import landing from "./documents/landing";
import event from "./documents/event";
import show from "./documents/show";

import homepage from "./documents/homepage";
import newsletter from "./documents/newsletter";
import menu from "./documents/menu";
import faq from "./documents/faq";
import ascii from "./documents/ascii";
import files from "./documents/files";
import icons from "./documents/icons";
import borders from "./documents/borders";
import comments from "./documents/comments";
import subscriber from "./documents/subscriber";
import background from "./documents/background";

// Modules

import blockHeading from "./modules/block/blockHeading";
import blockCarousel from "./modules/block/blockCarousel";
import blockImg from "./modules/block/blockImg";
import blockImgFull from "./modules/block/blockImgFull";
import blockImgGrid from "./modules/block/blockImgGrid";
import blockCollapsible from "./modules/block/blockCollapsible";
import blockFile from "./modules/block/blockFile";
import blockInternal from "./modules/block/blockInternal";
import blockExternal from "./modules/block/blockExternal";
import blockComment from "./modules/block/blockComment";
import blockRadio from "./modules/block/blockRadio";
import blockChat from "./modules/block/blockChat";
import blockBackground from "./modules/block/blockBackground";

import blockEvent from "./modules/block/blockEvent";
import blockShow from "./modules/block/blockShow";

import img from "./modules/img";
import ref from "./modules/ref";
import pageBlock from "./modules/pageBlock";
import faqBlock from "./modules/faqBlock";
import basicBlock from "./modules/basicBlock";
import eventBlock from "./modules/eventBlock";
import collapsibleBlock from "./modules/collapsibleBlock";


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
        show,

        faq,
        ascii,
        newsletter,
        files,
        icons,
        borders,
        comments,
        subscriber,
        background,

        // Block
        blockHeading,
        blockCarousel,
        blockImg,
        blockImgFull,
        blockImgGrid,
        blockCollapsible,
        blockFile,
        blockInternal,
        blockExternal,
        blockComment,
        blockEvent,
        blockShow,
        blockRadio,
        blockChat,
        blockBackground,

        // Module
        img,
        ref,
        pageBlock,
        faqBlock,
        basicBlock,
        eventBlock,
        collapsibleBlock,

    ]),
});
