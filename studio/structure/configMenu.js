import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import {
    ConfigIconLarge,
    HomepageIconLarge,
    MenuIconLarge,
    ASCIIIconLarge,
    IconsIconLarge,
    BordersIconLarge,
    SeoIconLarge,
} from "../schemas/styles/Icons";

export const ConfigMenu = S.listItem()
    .title("Configuration")
    .icon(ConfigIconLarge)
    .child(
        S.list()
            .title("Configuration")
            .items([
                S.listItem()
                    .title("Homepage")
                    .icon(HomepageIconLarge)
                    .child(
                        S.document().title("Homepage").schemaType("homepage").documentId("homepage")
                    ),
                orderableDocumentListDeskItem({
                    type: "menu",
                    title: "Menu",
                    icon: MenuIconLarge,
                }),
                S.divider(),
                orderableDocumentListDeskItem({
                    type: "ascii",
                    title: "ASCII",
                    icon: ASCIIIconLarge,
                }),
                S.listItem()
                    .title("Icons")
                    .icon(IconsIconLarge)
                    .child(
                        S.documentTypeList("icons")
                            .title("Icons")
                            .filter("_type == $type")
                            .params({ type: "icons" })
                    ),
                S.listItem()
                    .title("Borders")
                    .icon(BordersIconLarge)
                    .child(
                        S.documentTypeList("borders")
                            .title("Borders")
                            .filter("_type == $type")
                            .params({ type: "borders" })
                    ),
                S.divider(),
                S.listItem()
                    .title("SEO")
                    .icon(SeoIconLarge)
                    .child(S.document().title("SEO").schemaType("seo").documentId("seo")),
            ])
    );
