import S from "@sanity/desk-tool/structure-builder";

import { ConfigMenu } from "./structure/configMenu";
import { ContentMenu } from "./structure/contentMenu";

export default () => S.list().title("Site").items([ContentMenu, ConfigMenu]);
