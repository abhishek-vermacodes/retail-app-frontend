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
    title: 'Manage Orders',
    icon: 'truck',
    questions: [
      {
        question: 'How do I accept or reject a customer order?',
        answer: 'Navigate to the Orders tab on your home dashboard. Select the pending order, view details, and click "Accept Order" or "Cancel Order". Make sure to accept orders within 2 hours to avoid auto-cancellation.',
      },
      {
        question: 'How do I mark an order as dispatched?',
        answer: 'Once you package the items, go to the active order in the Orders tab and tap "Mark as Dispatched". You can also upload tracking details if you are using an external courier service.',
      },
      {
        question: 'What happens if a customer cancels an order?',
        answer: 'If the customer cancels before dispatch, you will be notified, the status will update to "Cancelled", and any payments will be refunded. If they cancel after dispatch, the package will be returned to you.',
      },
    ],
  },
  {
    title: 'Payments & Settlements',
    icon: 'credit-card',
    questions: [
      {
        question: 'When will I receive my payouts/settlements?',
        answer: 'Settlements are processed on a T+2 business days cycle (transaction day + 2 days) after successful order delivery. Payouts are directly deposited into your registered bank account.',
      },
      {
        question: 'Where can I see my settlement reports?',
        answer: 'You can access settlement reports in your profile under the Billing & Subscription section. You can download monthly invoices and transaction statements in PDF format.',
      },
      {
        question: 'Are there any platform commission fees?',
        answer: 'Yes, we charge a flat 5% platform commission fee on the order value for each successful transaction. Delivery fees are extra and calculated based on location distance.',
      },
    ],
  },
  {
    title: 'Product Listing Issues',
    icon: 'boxes',
    questions: [
      {
        question: 'Why is my product status showing "Under Review"?',
        answer: 'All new product listings go through our quality assurance check. It usually takes 4-12 hours for verification. If your product violates our policies, it will be rejected with feedback.',
      },
      {
        question: 'How can I update inventory/stock levels?',
        answer: 'Go to "My Products" screen, select the product, and edit the stock quantity. Tap save to apply changes. Out-of-stock products will automatically be hidden from customer search results.',
      },
      {
        question: 'Can I add multiple images to a single product?',
        answer: 'Yes! When editing or creating a product, you can select and upload up to 5 high-resolution images showing different angles of the item.',
      },
    ],
  },
  {
    title: 'Returns from Customers',
    icon: 'rotate-left',
    questions: [
      {
        question: 'What is the standard customer return policy?',
        answer: 'Customers can request a return within 7 days of delivery for eligible items (damaged, incorrect, or defective products). Fresh or perishable items are not eligible for returns.',
      },
      {
        question: 'Who bears the return shipping cost?',
        answer: 'If the return is due to seller error (wrong item sent, damaged product), we will bear the return courier charges. For other returns, a nominal shipping fee is shared.',
      },
      {
        question: 'How do I inspect and approve a return?',
        answer: 'Once the returned package reaches your store, inspect it. If it meets the return criteria, tap "Approve Refund" on the Returns section under the Orders tab to initiate settlement reversal.',
      },
    ],
  },
];

export const quickReplies = [
  { label: 'Order Status', text: 'Order delivery and accepting questions' },
  { label: 'Payout Cycle', text: 'When will I get my payment settlement?' },
  { label: 'Listing Rejected', text: 'Why is my product listing rejected?' },
  { label: 'Returns Policy', text: 'How do customer returns work?' },
  { label: 'Speak to Human', text: 'Connect me to an account manager' },
];

export const getBotResponse = (userMsg: string): string => {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Welcome to RetailPro Support. How can I help you today?";
  }
  if (
    msg.includes('order') ||
    msg.includes('delivery') ||
    msg.includes('ship') ||
    msg.includes('dispatch')
  ) {
    return "For order queries: Navigate to the 'Orders' tab. Select any order to accept, reject, or mark it as dispatched. Ensure orders are accepted within 2 hours of receipt.";
  }
  if (
    msg.includes('payment') ||
    msg.includes('settle') ||
    msg.includes('payout') ||
    msg.includes('money') ||
    msg.includes('finance')
  ) {
    return "Settlements are processed on a T+2 business days cycle after successful delivery. You can check invoices and statements in your Profile under 'Subscription & Billing'.";
  }
  if (
    msg.includes('product') ||
    msg.includes('listing') ||
    msg.includes('reject') ||
    msg.includes('approve') ||
    msg.includes('review')
  ) {
    return "New product listings are reviewed within 4-12 hours. Ensure images are high quality and meet guidelines. If your listing was rejected, review the feedback in 'My Products'.";
  }
  if (msg.includes('return') || msg.includes('refund')) {
    return "Returns are accepted within 7 days for eligible items. You can view return requests under the 'Orders' screen and tap 'Approve Refund' after inspecting the returned items.";
  }
  if (
    msg.includes('human') ||
    msg.includes('agent') ||
    msg.includes('manager') ||
    msg.includes('call') ||
    msg.includes('speak')
  ) {
    return "Connecting you with your Account Manager... You can also call them directly at +1 (800) 555-0199 or email us at support@retailpro.com.";
  }
  return "I'm sorry, I didn't quite get that. Could you please specify if your question is about Orders, Payments, Product Listings, or Returns? You can also ask to speak to an agent.";
};
