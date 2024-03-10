import YouTube from "react-youtube";

export const VideoPlayer = () => {
  // YouTube video ID
  const videoId = "p3JLaF_4Tz8";

  // Options for the YouTube player
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // Event handlers
  const onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};
