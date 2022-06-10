import React from "react";
import Emoji from "a11y-react-emoji";

const fontSize = (size) => (size ? { fontSize: "1rem" } : { fontSize: "2rem" });

export const ContentIcon = (size) => <Emoji style={fontSize(size)} symbol="🧳" />;
export const PageIcon = (size) => <Emoji style={fontSize(size)} symbol="📄" />;
export const ConfigIcon = (size) => <Emoji style={fontSize(size)} symbol="⚙️" />;
export const HomepageIcon = (size) => <Emoji style={fontSize(size)} symbol="🏠" />;
export const MenuIcon = (size) => <Emoji style={fontSize(size)} symbol="📂" />;
export const MenuIconSingle = (size) => <Emoji style={fontSize(size)} symbol="📁" />;
export const FAQIcon = (size) => <Emoji style={fontSize(size)} symbol="💬" />;
export const SeoIcon = (size) => <Emoji style={fontSize(size)} symbol="🚧" />;
export const FilesIcon = (size) => <Emoji style={fontSize(size)} symbol="🗄" />;
export const IconsIcon = (size) => <Emoji style={fontSize(size)} symbol="✳️" />;
export const BordersIcon = (size) => <Emoji style={fontSize(size)} symbol="🌀" />;
export const ImgIcon = (size) => <Emoji style={fontSize(size)} symbol="📷" />;
export const HeadingIcon = (size) => <Emoji style={fontSize(size)} symbol="📣" />;
export const CarouselIcon = (size) => <Emoji style={fontSize(size)} symbol="🎠" />;
export const CollapsibleIcon = (size) => <Emoji style={fontSize(size)} symbol="↕️" />;
export const FileIcon = (size) => <Emoji style={fontSize(size)} symbol="📎" />;
export const LinkIcon = (size) => <Emoji style={fontSize(size)} symbol="🔗" />;
export const InternalIcon = (size) => <Emoji style={fontSize(size)} symbol="📄" />;
export const ExternalIcon = (size) => <Emoji style={fontSize(size)} symbol="🌐" />;
export const CopyIcon = (size) => <Emoji style={fontSize(size)} symbol="✏️" />;
export const CommentIcon = (size) => <Emoji style={fontSize(size)} symbol="💭" />;
export const SubscriberIcon = (size) => <Emoji style={fontSize(size)} symbol="⭐️" />;
export const LandingIcon = (size) => <Emoji style={fontSize(size)} symbol="🚀" />;
export const HomeIcon = (size) => <Emoji style={fontSize(size)} symbol="🏠" />;
export const EmailIcon = (size) => <Emoji style={fontSize(size)} symbol="✉️" />;
export const PhoneIcon = (size) => <Emoji style={fontSize(size)} symbol="☎️" />;
export const EventIcon = (size) => <Emoji style={fontSize(size)} symbol="🎉" />;
export const EventIconAlt = (size) => <Emoji style={fontSize(size)} symbol="🗓" />;
export const ShowIcon = (size) => <Emoji style={fontSize(size)} symbol="🪩" />;
export const ImgGridIcon = (size) => <Emoji style={fontSize(size)} symbol="🖼" />;
export const RadioIcon = (size) => <Emoji style={fontSize(size)} symbol="📡" />;
export const ChatIcon = (size) => <Emoji style={fontSize(size)} symbol="💬" />;
export const CommentsIcon = (size) => <Emoji style={fontSize(size)} symbol="💭" />;
export const NewsletterIcon = (size) => <Emoji style={fontSize(size)} symbol="📫" />;
export const BackgroundIcon = (size) => <Emoji style={fontSize(size)} symbol="✨" />;

export const AsciiIcon = (letter) => (
    <span
        style={{
            width: "1.5rem",
            height: "1.5rem",
            position: "relative",
            background: "red",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <svg width="100%" height="100%">
            <defs>
                <style>
                    @import
                    url("https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap");
                </style>
            </defs>

            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".35em"
                fill="#ffffff"
                fontSize="16"
                fontFamily="Nunito"
            >
                {letter ? (letter.length > 1 ? "♣︎" : letter) : "A"}
            </text>
        </svg>
    </span>
);

