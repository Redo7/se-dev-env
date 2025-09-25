import { X } from "lucide-react";
import { Button } from "./ui/button";
import ReactJsonView from '@microlink/react-json-view'
import { useEffect, useRef } from "react";
import { useTypeDetection } from "@/hooks/useTypeDetection";

export type Notification = {
  id: string;
  level: "log" | "error" | "warn" ;
  errorType?: string;
  duration: number;
  title?: string;
  content: [content];
  errorContent?: {}
  close: (id: string) => void;
  closing?: boolean
}

type content = {
  messageType: string;
  message: string;
}

interface Props{
  notification: Notification
}

const ConsoleNotification = ({notification}: Props) => {
  const { id, title = "Console output", content, level, close, closing } = notification;
  const timeoutId = useRef<number | null>(null);
  const pauseStart = useRef<number | null>(null);
  const resumeStart = useRef<number | null>(null);
  const remaining = useRef(notification.duration);

useEffect(() => {
  // Start running immediately
  resumeStart.current = Date.now();
  timeoutId.current = window.setTimeout(
    () => close(notification.id),
    remaining.current
  );

  return () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };
}, [notification.duration, notification.id, close]);

const handleMouseEnter = () => {
  if (timeoutId.current && resumeStart.current) {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;

    // Subtract the run time since last resume
    const runElapsed = Date.now() - resumeStart.current;
    remaining.current -= runElapsed;

    // mark paused
    pauseStart.current = Date.now();
    resumeStart.current = null;
  }
};

const handleMouseLeave = () => {
  if (pauseStart.current != null) {
    // don’t subtract pause time!
    pauseStart.current = null;

    // start fresh timer with leftover
    resumeStart.current = Date.now();
    if (remaining.current > 0) {
      timeoutId.current = window.setTimeout(
        () => close(notification.id),
        remaining.current
      );
    }
  }
};


  function renderValue(value: any, index: number, length: number) {
    let output: React.ReactNode;
  
    // Error
    if (level === "error") {
      output = (
        <div>
          <p className="leading-3 error-name">
            {value.message.split(":")[0]}
          </p>
          <p className="leading-3">
            {value.message.split(":")[1]}
          </p>
        </div>
      );
    }
  
    // Null & undefined
    else if (value.messageType === null) {
      output = <span className="text-gray-400">null</span>;
    } else if (value.messageType === undefined) {
      output = <span className="text-gray-400">undefined</span>;
    }
  
    // Primitive types
    else if (value.messageType === "string") {
      output = <span className="text-white">{value.message}</span>;
    } else if (value.messageType === "number") {
      output = <span className="text-green-500">{value.message}</span>;
    } else if (value.messageType === "boolean") {
      output = <span className="text-purple-400">{String(value.message)}</span>;
    } else if (value.messageType === "function") {
      output = <span className="text-yellow-400">[Function]</span>;
    }
  
    // Arrays → recurse with index and length
    else if (value.messageType === "array") {
      const elements = value.message .substring(1, value.message.length - 1) .split(",");
      output = (
        <span className="text-orange-400">
          [
          {elements.map((v: any, i: number) =>
            renderValue(
              { message: v, messageType: useTypeDetection(v) },
              i,
              elements.length
            )
          )}
          ]
        </span>
      );
    }
  
    // Objects
    else if (value.messageType === "object") {
      output = (
        <div className="w-full my-1">
          <ReactJsonView
            displayDataTypes={false}
            src={JSON.parse(value.message)}
            theme="chalk"
            name={false}
            collapsed={1}
          />
        </div>
      );
    }
  
    // Fallback
    else {
      output = <span>{String(value.message)}</span>;
    }
  
    return (
      <span key={index}>
        {output}
        {index < length - 1 ? <span>, </span> : null}
      </span>
    );
  }
  
  return (
    <div className={`console-notification ${level} ${closing ? "animOut" : ""} depth-shadow`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button variant="link" size="unset" className="notification-close" onMouseUp={() => {close(id)}}><X size={14} color="var(--close-icon)"/></Button>
      <div className="notification-body">
        {level === 'log' ? <i className="bi bi-terminal"></i> : <i className="bi bi-x-circle"></i>}
        <div className="w-full">
          <p className="title mb-1">{title}</p>
          <div className="output w-full">{content.map((value: content, i) => ( renderValue(value, i, content.length) ))}</div>
        </div>
        <div className="notification-timer absolute">
          <div className="notification-timer-fill"></div>
        </div>
      </div>
    </div>
  )
}

export default ConsoleNotification