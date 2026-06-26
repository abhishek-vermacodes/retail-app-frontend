export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  icon: string;
  questions: FAQItem[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export const FAQ_DATA: FAQCategory[] = [
  {
    title: 'Track My Orders',
    icon: 'truck',
    questions: [
      {
        question: 'How do I track my order delivery?',
        answer: 'You can check your order status under the Orders tab on the home dashboard. The status will update from Placed to Accepted, Dispatched, or Delivered as the retailer processes your items.',
      },
      {
        question: 'How long does a standard delivery take?',
        answer: 'Delivery times vary depending on the store location and your address. Typically, local deliveries are completed within 2-4 hours, while standard deliveries might take 1-2 days.',
      },
      {
        question: 'What do I do if my order is delayed?',
        answer: 'If your delivery status has not updated or is delayed delayed beyond the expected timeframe, you can contact our support chat or call customer care at +1 (800) 555-0199.',
      },
    ],
  },
  {
    title: 'Payments & Refunds',
    icon: 'credit-card',
    questions: [
      {
        question: 'What payment methods are supported?',
        answer: 'We support all major Credit/Debit cards, UPI payments, net banking, and Cash on Delivery (COD). All digital payments are securely processed.',
      },
      {
        question: 'How long does a refund take to process?',
        answer: 'Once a refund is approved by the retailer or customer support, it takes 5-7 business days for the funds to reflect in your source account, depending on your bank.',
      },
      {
        question: 'Why was my transaction failed but money deducted?',
        answer: 'This is usually a temporary issue between payment gateways. Any deducted amount for failed transactions is automatically reversed by your bank within 2-4 hours.',
      },
    ],
  },
  {
    title: 'Account Issues',
    icon: 'user',
    questions: [
      {
        question: 'How do I change my saved address?',
        answer: 'Go to your Profile screen, click on "Saved Addresses", and set a new location on the interactive map. Confirm to save the updated address.',
      },
      {
        question: 'How do I change my account password?',
        answer: 'Navigate to Profile > Change Password. Enter your current password and your new password to securely update your credentials.',
      },
      {
        question: 'How can I update my profile username or email?',
        answer: 'Tap the edit icon next to your name on the Profile screen or select "Personal Information". Update your details and tap save.',
      },
    ],
  },
  {
    title: 'Returns & Cancellations',
    icon: 'rotate-left',
    questions: [
      {
        question: 'How do I cancel my order?',
        answer: 'You can cancel any order from the Orders tab before it is dispatched by the retailer. Once an order is dispatched, it cannot be cancelled directly and must be processed as a return.',
      },
      {
        question: 'What is the return window for products?',
        answer: 'Most products can be returned within 7 days of delivery if they are unused, in original packaging, and damaged or incorrect. Perishable products like fresh groceries are not returnable.',
      },
      {
        question: 'How do I initiate a return request?',
        answer: 'Go to your Orders, select the delivered order containing the product you want to return, and click "Request Return". Provide a reason and photos, and the retailer will inspect it.',
      },
    ],
  },
];

export const quickReplies = [
  { label: 'Track Order', text: 'How do I track my active order status?' },
  { label: 'Refund Status', text: 'How long does a refund take to clear?' },
  { label: 'Edit Address', text: 'How can I update my delivery address?' },
  { label: 'Cancel Order', text: 'Can I cancel an order after payment?' },
  { label: 'Talk to Support', text: 'Connect me with a customer agent' },
];

export const getBotResponse = (userMsg: string): string => {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Welcome to RetailPro Customer Support. How can I help you today?";
  }
  if (msg.includes('track') || msg.includes('order') || msg.includes('status') || msg.includes('delay')) {
    return "To track your order, please head to the 'Orders' tab. You'll see real-time updates of all active and past orders.";
  }
  if (msg.includes('refund') || msg.includes('pay') || msg.includes('transaction') || msg.includes('money')) {
    return "Refunds are processed within 5-7 business days of approval. We support cards, UPI, net banking, and COD.";
  }
  if (msg.includes('address') || msg.includes('password') || msg.includes('profile') || msg.includes('account')) {
    return "You can manage account settings directly in the 'Profile' tab (Personal Information, Saved Addresses, Change Password).";
  }
  if (msg.includes('cancel') || msg.includes('return') || msg.includes('policy')) {
    return "Orders can be cancelled before dispatch under the 'Orders' tab. Returns can be requested within 7 days of delivery for eligible items.";
  }
  if (msg.includes('agent') || msg.includes('human') || msg.includes('support') || msg.includes('call')) {
    return "Connecting you to a support specialist... You can also email us at support@retailpro.com or call customer care at +1 (800) 555-0199.";
  }
  return "I'm sorry, I didn't quite get that. Could you please specify if you need help with Orders, Refunds, Account settings, or Returns? You can also ask to speak to support.";
};
