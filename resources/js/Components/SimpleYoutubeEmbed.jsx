import React from "react";

const SimpleYouTubeEmbed = ({ videoId }) => {
    return (
        <div
            style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
            }}
        >
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0`}
                title="YouTube video"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            ></iframe>
        </div>
    );
};

export default SimpleYouTubeEmbed;
