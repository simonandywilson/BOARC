import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import {
    ConfigIcon,
    HomepageIcon,
    MenuIcon,
    NewsletterIcon,
    AsciiIcon,
    IconsIcon,
    BordersIcon,
    SeoIcon,
} from "../schemas/styles/Icons";

export const ConfigMenu = S.listItem()
    .title("Configuration")
    .icon(() => ConfigIcon())
    .child(
        S.list()
            .title("Configuration")
            .items([
                S.listItem()
                    .title("Homepage")
                    .icon(() => HomepageIcon())
                    .child(
                        S.document().title("Homepage").schemaType("homepage").documentId("homepage")
                    ),
                orderableDocumentListDeskItem({
                    type: "menu",
                    title: "Menu",
                    icon: () => MenuIcon(),
                }),
                S.listItem()
                    .title("Newsletter")
                    .icon(() => NewsletterIcon())
                    .child(
                        S.document()
                            .title("Newsletter")
                            .schemaType("newsletter")
                            .documentId("newsletter")
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
                S.divider(),
                S.listItem()
                    .title("SEO")
                    .icon(() => SeoIcon())
                    .child(S.document().title("SEO").schemaType("seo").documentId("seo")),
            ])
    );
