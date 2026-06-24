const Quote = require('../models/Quote');
const { sendQuoteEmail } = require('../config/mailer');

exports.renderHome = (req, res) => {
  res.render('index', { pageTitle: 'Garden & Landscaping Pros' });
};

exports.submitQuote = async (req, res) => {
  try {
    const quote = new Quote(req.body);
    const validation = quote.validate();

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields before sending.',
        errors: validation.errors,
      });
    }

    const emailResult = await sendQuoteEmail(quote);

    return res.status(200).json({
      success: true,
      message: emailResult.skipped
        ? 'Your quote request was received. Add SMTP credentials to your environment to deliver it to your inbox.'
        : 'Thanks! Your quote request was sent successfully.',
    });
  } catch (error) {
    console.error('Quote submission failed:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not process your request right now. Please try again later.',
    });
  }
};
