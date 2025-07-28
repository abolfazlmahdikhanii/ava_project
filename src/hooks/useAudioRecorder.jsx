"use client";

import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { toastOption } from "../helper/helper";

const useAudioRecorder = (onRecordingComplete) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("prompt");
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const checkPermission = useCallback(async () => {
    setPermissionStatus("checking");
    setError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("ضبط صدا در این مرورگر پشتیبانی نمی‌شود");
      }

      if (navigator.permissions) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "microphone",
          });
          if (permissionStatus.state === "denied") {
            setPermissionStatus("denied");
            toast.error(
              "دسترسی به میکروفون قبلاً رد شده است. لطفاً مجوز را در تنظیمات مرورگر خود فعال کنید.",
              toastOption
            );
            return false;
          }
        } catch (e) {
          // Continue with getUserMedia if Permissions API is not fully supported
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      setPermissionStatus("granted");
      streamRef.current = stream;
      return true;
    } catch (err) {
      
      setPermissionStatus("denied");

      toast.error(
        "دسترسی به میکروفون رد شد. لطفاً دسترسی به میکروفون را مجاز کنید.",
        toastOption
      );

      return false;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    return await checkPermission();
  }, [checkPermission]);

  const startRecording = useCallback(async () => {
    try {
      const hasPermission = await checkPermission();
      if (!hasPermission || !streamRef.current) return;

      chunksRef.current = [];
      setAudioBlob(null);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType || "audio/webm",
        });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));

        if (onRecordingComplete) {
          onRecordingComplete(blob);
        }

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setIsPaused(false);

      setError(null);
    } catch (err) {
     
      setError("شروع ضبط ناموفق بود. لطفاً دوباره تلاش کنید.");
    }
  }, [checkPermission, audioUrl, onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [isRecording]);

  const clearRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);

    setError(null);
  }, [audioUrl]);

  const resetRecording = useCallback(() => {
    // Stop recording if active
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    // Clean up audio data
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // Reset all states
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setError(null);

    // Clean up stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [isRecording, audioUrl]);

  return {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    clearRecording,
    requestPermission,
    permissionStatus,
    error,
    resetRecording,
  };
};
export default useAudioRecorder;
