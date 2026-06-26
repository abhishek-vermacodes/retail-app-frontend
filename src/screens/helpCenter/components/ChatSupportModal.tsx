import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Message, quickReplies, getBotResponse } from '../faqData';
import styles from '../customerHelpCenter.styles';

interface ChatSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSupportModal = ({ isOpen, onClose }: ChatSupportModalProps) => {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Initialize first welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: 'Hi there! I am your RetailPro Assistant. How can I help you today?',
          sender: 'bot',
          time: getCurrentTime(),
        },
      ]);
    }
  }, [isOpen]);

  // Auto scroll to bottom of chat list
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping, isOpen]);

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  }

  const handleSendMessage = (textToSend?: string) => {
    const finalMsg = textToSend || chatMessage;
    if (!finalMsg.trim()) return;

    // Clear text input if typing custom message
    if (!textToSend) {
      setChatMessage('');
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: finalMsg,
      sender: 'user',
      time: getCurrentTime(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botReplyText = getBotResponse(finalMsg);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReplyText,
        sender: 'bot',
        time: getCurrentTime(),
      };
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <View style={styles.chatHeaderLeft}>
            <TouchableOpacity style={styles.chatCloseBtn} onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.chatTitleContainer}>
              <Text style={styles.chatTitle}>Customer Support</Text>
              <Text style={styles.chatSubtitle}>Online Assistant</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome6 name="message" size={16} color="#ff6a32" />
          </View>
        </View>

        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatMessageListContent}
          style={styles.chatMessageList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isUser = item.sender === 'user';
            return (
              <View
                style={[
                  styles.messageBubble,
                  isUser ? styles.userMessageBubble : styles.botMessageBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isUser ? styles.userMessageText : styles.botMessageText,
                  ]}
                >
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    isUser ? styles.userMessageTime : styles.botMessageTime,
                  ]}
                >
                  {item.time}
                </Text>
              </View>
            );
          }}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingIndicatorContainer}>
                <Text style={styles.typingText}>Support Bot is typing</Text>
                <FontAwesome6 name="ellipsis" size={14} color="#888" />
              </View>
            ) : null
          }
        />

        {/* Quick Replies */}
        <View style={styles.quickRepliesContainer}>
          <Text style={styles.quickRepliesLabel}>Frequently Asked Questions:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRepliesScroll}
          >
            {quickReplies.map((reply, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.quickReplyChip}
                onPress={() => handleSendMessage(reply.text)}
              >
                <Text style={styles.quickReplyChipText}>{reply.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Type your query..."
            placeholderTextColor="#888"
            value={chatMessage}
            onChangeText={setChatMessage}
            multiline
          />
          <TouchableOpacity
            style={styles.chatSendBtn}
            onPress={() => handleSendMessage()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChatSupportModal;
