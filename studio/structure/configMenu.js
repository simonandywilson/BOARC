import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";


import {
    ConfigIcon,
    MenuIcon,
    LandingIcon,
    NewsletterIcon,
    AsciiIcon,
    IconsIcon,
    BordersIcon,
    SeoIcon,
    BackgroundIcon,
} from "../schemas/styles/Icons";

export const ConfigMenu = S.listItem()
    .title("Configuration")
    .icon(() => ConfigIcon())
    .child(
        S.list()
            .title("Configuration")
            .items([
                orderableDocumentListDeskItem({
                    type: "menu",
                    title: "Menu",
                    icon: () => MenuIcon(),
                }),
                S.listItem()
                    .title("Landings")
                    .icon(() => LandingIcon())
                    .child(
                        S.documentTypeList("landing")
                            .title("Landing Pages")
                            .filter("_type == $type")
                            .params({ type: "landing" })
                    ),

                S.divider(),
                orderableDocumentListDeskItem({
                    type: "ascii",
                    title: "ASCII",
                    icon: () => AsciiIcon(),
                }),
                orderableDocumentListDeskItem({
                    type: "icons",
                    title: "Icons",
                    icon: () => IconsIcon(),
                }),
                S.listItem()
                    .title("Borders")
                    .icon(() => BordersIcon())
                    .child(
                        S.documentTypeList("borders")
                            .title("Borders")
                            .filter("_type == $type")
                            .params({ type: "borders" })
                    ),
                S.listItem()
                    .title("Backgrounds")
                    .icon(() => BackgroundIcon())
                    .child(
                        S.documentTypeList("background")
                            .title("Backgrounds")
                            .filter("_type == $type")
                            .params({ type: "background" })
                    ),
                S.divider(),
                S.listItem()
                    .title("Newsletter")
                    .icon(() => NewsletterIcon())
                    .child(
                        S.document()
                            .title("Newsletter")
                            .schemaType("newsletter")
                            .documentId("newsletter")
                    ),
                S.listItem()
                    .title("SEO")
                    .icon(() => SeoIcon())
                    .child(S.document().title("SEO").schemaType("seo").documentId("seo")),
            ])
    );
