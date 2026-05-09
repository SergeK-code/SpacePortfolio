export const contactContent = {
  heading: { title: "Get In", accent: "Touch" },
  subtitle: "I’m always open to new opportunities.",
  intro:
    "Whether you have a project in mind, a question, or just want to say hello, my inbox is always open.",
  availability: "Open to opportunities",
  form: {
    labels: {
      country: "Country",
      phone: "Phone number",
      budget: "Budget range",
      timeline: "Timeline",
    },
    budgetOptions: [
      { value: "lt-1000", label: "Under $1,000" },
      { value: "1000-5000", label: "$1,000 – $5,000" },
      { value: "5000-10000", label: "$5,000 – $10,000" },
      { value: "gt-10000", label: "Over $10,000" },
    ],
    timelineOptions: [
      { value: "flexible", label: "Flexible" },
      { value: "standard", label: "Standard" },
      { value: "expedited", label: "Expedited" },
    ],
    placeholders: {
      name: "Your Name",
      email: "Your Email",
      country: "Country Code",
      phone: "Phone number",
      zipCode: "ZIP / Postal code",
      message: "Your Message",
    },
    submit: {
      idle: "Send Message",
      sent: "Message Sent ✓",
    },
    validation: {
      required: "This field is required.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please enter a valid phone number.",
    },
    netlify: {
      formName: "contact",
      honeypotFieldName: "bot-field",
    },
  },
} as const;
