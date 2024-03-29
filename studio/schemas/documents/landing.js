import { isUniqueAcrossAllDocuments } from "../functions/isUniqueAcrossAllDocuments";
import { LandingIcon} from "../styles/Icons";
import RenderLanding from "../components/landing/RenderLanding";

export default {
    name: "landing",
    title: "Landing",
    type: "document",
    icon: () => LandingIcon(),
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            type: "slug",
            description: "bidstonobservatory.org/",
            options: {
                source: "title",
                basePath: "bidstonobservatory.org/",
                isUnique: isUniqueAcrossAllDocuments,
                maxLength: 30,
            },
            validation: (Rule) => [Rule.required().error()],
        },
        {
            name: "pages",
            title: "Pages",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "page" }],
                    title: "Reference to Pages",
                },
            ],
        },
        {
            name: "preview",
            title: "Landing Preview",
            type: "string",
            description:
                "Change the 'Landing' settings under each individual page to change how this landing page looks.",
            readOnly: true,
            inputComponent: RenderLanding,
            hidden: ({ parent }) => !parent?.pages,
        },
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title: title ? title : "Untitled Landing Page",
                media: () => LandingIcon(),
            };
        },
    },
};
