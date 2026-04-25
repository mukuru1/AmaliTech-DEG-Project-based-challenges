import { useState, useCallback, useRef, useEffect } from 'react';
import { useFlowContext } from '../../context/flowcontext';
import useTraversal from '../../hooks/useTraversal';





export default function ChatWindow() {
  const { nodes, connections, setPreview } = useFlowContext();
  const { getNextNode, getStart } = useTraversal();
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [ended, setEnded] = useState(false);
  const scrollRef = useRef(null);

  const startChat = useCallback(() => {
    const start = getStart();
    if (!start) return;

    setMessages([]);
    setEnded(false);
    setWaitingForInput(false);

    processNode(start);
  }, [nodes, connections]);

  const processNode = useCallback(
    (node) => {
      if (!node) {
        setEnded(true);
        setWaitingForInput(false);
        return;
      }

      setCurrentNode(node);

      if (node.type === 'start') {
        if (node.data.text) {
          setMessages((prev) => [
            ...prev,
            { type: 'bot', text: node.data.text },
          ]);
        }
        if (node.data.options?.length > 0) {
          setWaitingForInput(true);
        } else {
          const next = getNextNode(node.id);
          if (next) {
            setTimeout(() => processNode(next), 400);
          } else {
            setEnded(true);
            setWaitingForInput(false);
          }
        }
      } else if (node.type === 'message') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: node.data.text || 'No message' },
        ]);
        const next = getNextNode(node.id);
        if (next) {
          setTimeout(() => processNode(next), 400);
        } else {
          setEnded(true);
          setWaitingForInput(false);
        }
      } else if (node.type === 'question') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: node.data.text || 'No question' },
        ]);
        if (node.data.options?.length > 0) {
          setWaitingForInput(true);
        } else {
          setEnded(true);
          setWaitingForInput(false);
        }
      } else if (node.type === 'end') {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: node.data.text || 'Conversation ended. Thank you!' },
        ]);
        setEnded(true);
        setWaitingForInput(false);
      }
    },
    [getNextNode]
  );

  const handleOptionSelect = useCallback(
    (optionIndex) => {
      if (!currentNode) return;

      const option = currentNode.data.options?.[optionIndex];
      if (option) {
        setMessages((prev) => [
          ...prev,
          { type: 'user', text: option.label },
        ]);
      }

      setWaitingForInput(false);
      const next = getNextNode(currentNode.id, optionIndex);
      if (next) {
        setTimeout(() => processNode(next), 400);
      } else {
        setEnded(true);
      }
    },
    [currentNode, getNextNode, processNode]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, waitingForInput]);

  useEffect(() => {
    startChat();
  }, []);