type VideoPlayerProps = {
  src: string;
};

function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <video width={850} height={482} autoPlay muted controls>
      <source src={src} type="video/mp4" />
      <track kind="captions" srcLang="en" />
    </video>
  );
}

export default VideoPlayer;
