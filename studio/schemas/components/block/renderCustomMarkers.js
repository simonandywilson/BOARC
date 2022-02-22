import React from "react";

export default function renderCustomMarkers(markers) {
    return (
        <div>
            {markers.map((marker, index) => {
                if (marker.type === "comment") {
                    return <div key={`marker${index}`}>A comment!</div>;
                }
                return null;
            })}
        </div>
    );
}
