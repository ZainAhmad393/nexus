import React, { useRef, useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Share2, XCircle } from 'lucide-react';

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [isCallActive, setIsCallActive] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenShareOn, setScreenShareOn] = useState(false);

  const startCall = async () => {
    setIsCallActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  };

  const toggleMic = () => {
    setMicOn(prev => {
      const stream = localVideoRef.current?.srcObject as MediaStream;
      stream?.getAudioTracks().forEach(track => (track.enabled = !prev));
      return !prev;
    });
  };

  const toggleCamera = () => {
    setCameraOn(prev => {
      const stream = localVideoRef.current?.srcObject as MediaStream;
      stream?.getVideoTracks().forEach(track => (track.enabled = !prev));
      return !prev;
    });
  };

  const toggleScreenShare = async () => {
    if (!screenShareOn) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        setScreenShareOn(true);
      } catch (err) {
        console.error('Error sharing screen:', err);
      }
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setScreenShareOn(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Video Call</h1>

      {/* Video Panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Local Video */}
        <div className="relative w-80 h-60 bg-black rounded-xl shadow-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 text-white bg-gray-800 bg-opacity-70 px-3 py-1 text-sm rounded-full">
            You
          </span>
        </div>

        {/* Remote Video */}
        <div className="relative w-80 h-60 bg-black rounded-xl shadow-lg overflow-hidden">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 text-white bg-gray-800 bg-opacity-70 px-3 py-1 text-sm rounded-full">
            Remote
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        {!isCallActive ? (
          <button
            onClick={startCall}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            <Video size={18} />
            Start Call
          </button>
        ) : (
          <button
            onClick={endCall}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            <XCircle size={18} />
            End Call
          </button>
        )}

        <button
          onClick={toggleMic}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition ${
            micOn ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          {micOn ? 'Mic On' : 'Mic Off'}
        </button>

        <button
          onClick={toggleCamera}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition ${
            cameraOn ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
          {cameraOn ? 'Camera On' : 'Camera Off'}
        </button>

        <button
          onClick={toggleScreenShare}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition ${
            screenShareOn ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-gray-300 text-gray-700'
          }`}
        >
          <Share2 size={18} />
          {screenShareOn ? 'Stop Share' : 'Share Screen'}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
