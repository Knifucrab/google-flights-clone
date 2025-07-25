import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How can I find last-minute flight deals?",
      answer: "It's easy to find last-minute flights with Spotter Flights. Select your departure and destination cities in the form at the top of the page and use the calendar to choose your travel dates to find the most affordable flights available. You can even check flights departing today. For the cheapest tickets, it's best to book at least a few weeks in advance for domestic flights and a few months for international flights."
    },
    {
      id: 2,
      question: "How can I find cheap flights for a weekend getaway?",
      answer: "To find cheap weekend flights, be flexible with your travel dates and destinations. Use our flexible date search to compare prices across different weekends. Consider flying on Friday evening or Sunday evening instead of Saturday for better deals. Book domestic weekend trips 1-3 weeks in advance for the best prices."
    },
    {
      id: 3,
      question: "How can I find flight deals if my travel plans are flexible?",
      answer: "If you have flexible travel plans, use our flexible date search and destination comparison tools. Consider flying mid-week instead of weekends, and be open to nearby airports. Set up price alerts for your preferred routes and book when prices drop. Off-season travel can also offer significant savings."
    },
    {
      id: 4,
      question: "How can I find cheap flights from United States to anywhere?",
      answer: "To find cheap flights from United States, compare prices to multiple destinations, be flexible with your travel dates, and consider flying during shoulder seasons. Book international flights 2-3 months in advance for the best deals. Use our destination comparison tool to find the cheapest international destinations from your departure city."
    },
    {
      id: 5,
      question: "How can I receive flight alerts for my trip?",
      answer: "Set up price alerts by searching for your desired route and clicking on the price alert option. We'll monitor price changes and notify you when prices drop or rise significantly. You can set alerts for specific dates or flexible date ranges to get the best deals for your trip."
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <button 
                className={`faq-question ${openItem === item.id ? 'active' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.question}</span>
                {openItem === item.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openItem === item.id && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
