import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './retailerHelp.styles';
import { FAQ_DATA } from './faqData';
import HelpRow from './components/HelpRow';
import ChatSupportModal from './components/ChatSupportModal';

const RetailerHelp = () => {
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Accordion state
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Chat modal state
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle Search Filtering
  const getFilteredFAQs = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: { category: string; question: string; answer: string }[] = [];
    FAQ_DATA.forEach(cat => {
      cat.questions.forEach(q => {
        if (
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query)
        ) {
          results.push({ category: cat.title, ...q });
        }
      });
    });
    return results;
  };

  const filteredFAQs = getFilteredFAQs();

  // Handle support links
  const handleEmailSupport = async () => {
    const emailUrl = 'mailto:support@retailpro.com?subject=Retailer%20Support%20Request';
    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert(
          'Email Support',
          'Please send an email to:\n\nsupport@retailpro.com\n\n(Mail client not available on this device.)',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Email Support',
        'Could not open mail client. Contact: support@retailpro.com',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCallManager = async () => {
    const telUrl = 'tel:+18005550199';
    try {
      const supported = await Linking.canOpenURL(telUrl);
      if (supported) {
        await Linking.openURL(telUrl);
      } else {
        Alert.alert(
          'Call Manager',
          'Please call your account manager at:\n\n+1 (800) 555-0199\n\n(Phone dialer not supported.)',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Call Manager',
        'Could not open dialer. Contact: +1 (800) 555-0199',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
                  <Ionicons name="arrow-back" size={18} color="#000" />

        </TouchableOpacity>
        <Text style={styles.pageTitle}>Retailer Help</Text>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            setIsVisible(prev => !prev);
            setSearchQuery('');
          }}
        >
          <Ionicons
            name={isVisible ? "close" : "search"}
            size={18}
            color={'#000'}
          />
        </TouchableOpacity>
      </View>

      {isVisible && (
        <View style={styles.searchContainer}>
          <Feather name="search" color={'#000000a3'} size={20} />
          <TextInput
            placeholder="Search FAQs & topics..."
            placeholderTextColor={'#000000a3'}
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {searchQuery.trim() ? (
        // Search Results View
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchResultsTitle}>
            Search Results ({filteredFAQs.length})
          </Text>
          {filteredFAQs.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredFAQs.map((faq, index) => {
                const isFaqExpanded = expandedFAQ === faq.question;
                return (
                  <View key={index} style={styles.searchResultCard}>
                    <Text style={styles.searchResultCatText}>{faq.category}</Text>
                    <TouchableOpacity
                      style={styles.faqQuestionRow}
                      onPress={() => setExpandedFAQ(isFaqExpanded ? null : faq.question)}
                    >
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                      <Feather
                        name={isFaqExpanded ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color="#ff6a32"
                      />
                    </TouchableOpacity>
                    {isFaqExpanded && (
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
              <Ionicons name="search-outline" size={48} color="#ccc" />
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#666', marginTop: 10 }}>
                No FAQs match your search query.
              </Text>
            </View>
          )}
        </View>
      ) : (
        // Standard Categories and Support View
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.cardHeaderTitle}>Quick Help</Text>
          <View style={styles.cardContainer}>
            <View style={styles.CardSubContainer}>
              {FAQ_DATA.map((category, index) => {
                const isCatExpanded = expandedCategory === category.title;
                return (
                  <View key={category.title}>
                    <HelpRow
                      title={category.title}
                      icon={category.icon}
                      isAccordion={true}
                      isExpanded={isCatExpanded}
                      onPress={() =>
                        setExpandedCategory(isCatExpanded ? null : category.title)
                      }
                    />
                    {isCatExpanded && (
                      <View style={styles.faqListContainer}>
                        {category.questions.map(faq => {
                          const isFaqExpanded = expandedFAQ === faq.question;
                          return (
                            <View key={faq.question} style={styles.faqItem}>
                              <TouchableOpacity
                                style={styles.faqQuestionRow}
                                onPress={() =>
                                  setExpandedFAQ(
                                    isFaqExpanded ? null : faq.question
                                  )
                                }
                              >
                                <Text style={styles.faqQuestionText}>
                                  {faq.question}
                                </Text>
                                <Feather
                                  name={
                                    isFaqExpanded ? 'chevron-up' : 'chevron-down'
                                  }
                                  size={16}
                                  color="#666"
                                />
                              </TouchableOpacity>
                              {isFaqExpanded && (
                                <Text style={styles.faqAnswerText}>
                                  {faq.answer}
                                </Text>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    )}
                    {index < FAQ_DATA.length - 1 && <View style={styles.line} />}
                  </View>
                );
              })}
            </View>
          </View>

          <Text style={styles.cardHeaderTitle}>Support</Text>
          <View style={styles.cardContainer}>
            <View style={styles.CardSubContainer}>
              <View>
                <HelpRow
                  title="Chat with Retailer Support"
                  icon="message"
                  onPress={() => setIsChatOpen(true)}
                />
                <View style={styles.line} />
              </View>
              <View>
                <HelpRow
                  title="Email Retailer Team"
                  icon="envelope"
                  onPress={handleEmailSupport}
                />
                <View style={styles.line} />
              </View>
              <View>
                <HelpRow
                  title="Call Account Manager"
                  icon="phone"
                  onPress={handleCallManager}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Support Chat Modal */}
      <ChatSupportModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </View>
  );
};

export default RetailerHelp;
