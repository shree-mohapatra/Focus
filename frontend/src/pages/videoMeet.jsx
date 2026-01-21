import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";

import styles from "../styles/videoComponent.module.css";
import server from "../environment";

const server_url = server;
const connections = {};

export default function VideoMeet() {
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoRef = useRef();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [screen, setScreen] = useState(false);

  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        window.localStream = s;
        localVideoRef.current.srcObject = s;
      });
  }, []);

  const handleEndCall = () => {
    window.localStream.getTracks().forEach((t) => t.stop());
    navigate("/home");
  };

  return (
    <div className={styles.meetVideoContainer}>
      {showChat && (
        <div className={styles.chatRoom}>
          <div className={styles.chatContainer}>
            <h2>Chat</h2>

            <div className={styles.chattingDisplay}>
              {messages.length === 0 ? (
                <p>No messages yet</p>
              ) : (
                messages.map((m, i) => (
                  <div key={i}>
                    <b>{m.sender}</b>
                    <p>{m.data}</p>
                  </div>
                ))
              )}
            </div>

            <div className={styles.chattingArea}>
              <TextField
                fullWidth
                value={message}
                label="Enter message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="contained">Send</Button>
            </div>

            {/* MOBILE BUTTONS */}
            <div
              className={`${styles.buttonContainers} ${styles.mobileButtons}`}
            >
              <IconButton onClick={() => setVideo(!video)}>
                {video ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>

              <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                <CallEndIcon />
              </IconButton>

              <IconButton onClick={() => setAudio(!audio)}>
                {audio ? <MicIcon /> : <MicOffIcon />}
              </IconButton>

              <IconButton onClick={() => setScreen(!screen)}>
                {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
              </IconButton>

              <Badge badgeContent={newMessages} color="secondary">
                <IconButton onClick={() => setShowChat(!showChat)}>
                  <ChatIcon />
                </IconButton>
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP BUTTONS */}
      <div className={styles.buttonContainers}>
        <IconButton onClick={() => setVideo(!video)}>
          {video ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>

        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
          <CallEndIcon />
        </IconButton>

        <IconButton onClick={() => setAudio(!audio)}>
          {audio ? <MicIcon /> : <MicOffIcon />}
        </IconButton>

        <IconButton onClick={() => setScreen(!screen)}>
          {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
        </IconButton>

        <IconButton onClick={() => setShowChat(!showChat)}>
          <ChatIcon />
        </IconButton>
      </div>

      <video
        ref={localVideoRef}
        autoPlay
        muted
        className={styles.meetUserVideo}
      />

      <div className={styles.conferenceView}>
        {videos.map((v) => (
          <video key={v.socketId} autoPlay />
        ))}
      </div>
    </div>
  );
}
