import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

const MessageEditor = ({ initialContent = '', onChange }) => {
  const [content, setContent] = useState(initialContent);
  const wsRef = useRef(null);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'init' || data.type === 'update') {
        isRemoteUpdate.current = true;
        setContent(data.content);
        onChange && onChange(data.content);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from server');
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onChange]);

  const handleChange = (value) => {
    // If this is a remote update, don't send it back
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
    console.log(value)
    setContent(value);
    console.log(wsRef.current, wsRef.current.readyState, WebSocket.OPEN)
    try {
      onChange && onChange(value);
    } catch (err) {
      console.error("Error in onChange callback:", err);
    }

    // Send update to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log("Running....")
      wsRef.current.send(JSON.stringify({
        type: 'update',
        content: value
      }));
    }
  };

  return (
    <Editor
      height="85%"
      language="javascript"
      value={content}
      onChange={handleChange}
      theme="vs-dark"
      options={{
        lineNumbers: "on",
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
};

export default MessageEditor;