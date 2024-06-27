import React, { useEffect, useRef } from 'react';

const LiveFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing the camera: ", err);
        });
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const detectMask = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      fetch("/predict", {
        method: "POST",
        body: JSON.stringify({ image: imageData }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const [withMask, withoutMask] = data.predictions[0];
          if (withMask > withoutMask) {
            context.fillStyle = "rgba(0, 255, 0, 0.5)";
          } else {
            context.fillStyle = "rgba(255, 0, 0, 0.5)";
          }
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      })
      .catch(err => console.error(err));
    };

    const intervalId = setInterval(detectMask, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
    </div>
  );
};

export default LiveFeed;