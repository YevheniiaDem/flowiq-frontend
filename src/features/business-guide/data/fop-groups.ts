import { FopGroupDetail, FopGroupSummary } from "../types";

export const mockFopGroupSummaries: FopGroupSummary[] = [
  {
    id: "group-1",
    slug: "1",
    name: "FOP Group 1",
    shortDescription:
      "For small-scale trade, services, and production without employees. The simplest tax regime with the lowest income ceiling.",
    incomeLimit: "₴1,672,000 / year",
    employees: "Not allowed",
    taxType: "Unified Tax 1% or 2%",
  },
  {
    id: "group-2",
    slug: "2",
    name: "FOP Group 2",
    shortDescription:
      "The most popular group for IT freelancers, consultants, and service providers. Allows limited hiring with simplified reporting.",
    incomeLimit: "₴5,328,000 / year",
    employees: "Up to 10",
    taxType: "Unified Tax 3% or 5%",
  },
  {
    id: "group-3",
    slug: "3",
    name: "FOP Group 3",
    shortDescription:
      "For growing businesses with higher revenue and VAT obligations. Suitable for companies scaling beyond Group 2 limits.",
    incomeLimit: "₴7,818,000 / year",
    employees: "Unlimited",
    taxType: "Unified Tax 5% + VAT",
  },
  {
    id: "group-general",
    slug: "general",
    name: "General Tax System",
    shortDescription:
      "Full taxation with income tax, VAT, and detailed accounting. Required when unified tax limits are exceeded or for specific activities.",
    incomeLimit: "No limit",
    employees: "Unlimited",
    taxType: "Income Tax 18% + VAT 20%",
  },
];

const groupDetails: Record<string, Omit<FopGroupDetail, keyof FopGroupSummary>> = {
  "group-1": {
    overview:
      "FOP Group 1 is designed for individual entrepreneurs engaged in retail trade, household services, or small-scale production. It offers the lowest tax burden but restricts hiring and caps annual income at ₴1,672,000. Ideal for solo operators starting their business journey.",
    taxes: [
      {
        name: "Unified Tax",
        rate: "1% (trade) or 2% (services)",
        description: "Single tax replacing income tax and VAT for eligible activities.",
        paymentDeadline: "Quarterly, by the 20th of the following month",
      },
      {
        name: "ESV",
        rate: "22% of minimum wage",
        description: "Mandatory social contribution regardless of income level.",
        paymentDeadline: "Monthly, by the 19th",
      },
    ],
    incomeLimits: {
      annual: "₴1,672,000",
      monthly: "₴139,333",
      currency: "UAH",
      note: "Exceeding the annual limit requires transition to Group 2 or General Tax System within 40 days.",
    },
    employeesInfo:
      "Hiring employees is not permitted under Group 1. If you need staff, you must switch to Group 2 or higher before signing employment contracts.",
    allowedActivities: [
      "Retail trade without store premises",
      "Household services (repair, cleaning, beauty)",
      "Small-scale production of goods",
      "Agricultural product sales",
      "Photography and event services",
    ],
    popularKveds: [
      { code: "47.91", name: "Retail sale via mail order or internet" },
      { code: "96.02", name: "Hairdressing and beauty treatment" },
      { code: "95.11", name: "Repair of computers and peripherals" },
      { code: "74.20", name: "Photography activities" },
    ],
    advantages: [
      "Lowest unified tax rate in the system",
      "Minimal reporting requirements",
      "No VAT obligations",
      "Simple bookkeeping with income ledger",
    ],
    risks: [
      "Strict income ceiling limits growth",
      "Cannot hire employees",
      "Limited range of permitted activities",
      "Automatic transition required if limit exceeded",
    ],
    faq: [
      {
        question: "Can I switch from Group 1 to Group 2 mid-year?",
        answer:
          "Yes, but only at the beginning of a new quarter. Submit an application to the tax authority before the quarter starts.",
      },
      {
        question: "What happens if I exceed the income limit?",
        answer:
          "You must transition to Group 2 or the General Tax System within 40 days. Income above the limit is taxed at the higher group's rate.",
      },
      {
        question: "Do I need a cash register (PRRO)?",
        answer:
          "Yes, if you accept cash or card payments from individuals. Online payments through banks may have exemptions.",
      },
    ],
  },
  "group-2": {
    overview:
      "FOP Group 2 is the go-to choice for Ukrainian IT specialists, consultants, designers, and service businesses. With an income limit of ₴5,328,000 and the ability to hire up to 10 employees, it balances simplicity with growth potential.",
    taxes: [
      {
        name: "Unified Tax",
        rate: "3% (without VAT) or 5% (with VAT option)",
        description: "Single tax on income from entrepreneurial activity.",
        paymentDeadline: "Quarterly, by the 20th of the following month",
      },
      {
        name: "ESV",
        rate: "22% of minimum wage",
        description: "Fixed monthly social contribution for the FOP owner.",
        paymentDeadline: "Monthly, by the 19th",
      },
      {
        name: "Employee Taxes",
        rate: "18% PIT + 22% ESV + 1.5% military levy",
        description: "Withheld from employee salaries if you have staff.",
        paymentDeadline: "Monthly, by the 20th",
      },
    ],
    incomeLimits: {
      annual: "₴5,328,000",
      monthly: "₴444,000",
      currency: "UAH",
      note: "Monitor cumulative income — approaching 90% should trigger planning for Group 3 transition.",
    },
    employeesInfo:
      "You may employ up to 10 people under official labor contracts. All standard employment taxes and reporting apply. Exceeding 10 employees requires moving to Group 3.",
    allowedActivities: [
      "IT services and software development",
      "Consulting and professional services",
      "Digital marketing and design",
      "Education and training services",
      "Translation and content creation",
      "Real estate agency services",
    ],
    popularKveds: [
      { code: "62.01", name: "Computer programming activities" },
      { code: "62.02", name: "Computer consultancy activities" },
      { code: "73.11", name: "Advertising agencies" },
      { code: "70.22", name: "Business and management consultancy" },
      { code: "74.10", name: "Specialised design activities" },
    ],
    advantages: [
      "Popular choice for IT and digital services",
      "Can hire up to 10 employees",
      "Reasonable income ceiling for solo and small teams",
      "Simplified tax reporting",
    ],
    risks: [
      "Income limit may be reached with growing client base",
      "Must track employee count strictly",
      "Some B2B clients require VAT invoices (5% rate option)",
      "Currency fluctuations affect UAH income calculations",
    ],
    faq: [
      {
        question: "Should I choose 3% or 5% unified tax rate?",
        answer:
          "Choose 3% if all clients are individuals or non-VAT payers. Choose 5% if you need to issue VAT invoices to corporate clients.",
      },
      {
        question: "Can I work with foreign clients?",
        answer:
          "Yes. Foreign currency income is converted to UAH at the NBU rate on the payment date and counts toward your annual limit.",
      },
      {
        question: "How do I add a new KVED?",
        answer:
          "Submit form №5 through Diia or the tax office. Changes take effect within 1-3 business days.",
      },
    ],
  },
  "group-3": {
    overview:
      "FOP Group 3 is for established businesses with higher turnover. It requires VAT registration and accounting but supports unlimited employees and an annual income cap of ₴7,818,000. Common for agencies, studios, and growing service companies.",
    taxes: [
      {
        name: "Unified Tax",
        rate: "5%",
        description: "Fixed rate on entrepreneurial income.",
        paymentDeadline: "Quarterly, by the 20th of the following month",
      },
      {
        name: "VAT",
        rate: "20%",
        description: "Value-added tax on goods and services. Input VAT can be credited.",
        paymentDeadline: "Monthly, by the 20th",
      },
      {
        name: "ESV",
        rate: "22% of minimum wage",
        description: "Mandatory social contribution for the FOP owner.",
        paymentDeadline: "Monthly, by the 19th",
      },
    ],
    incomeLimits: {
      annual: "₴7,818,000",
      monthly: "₴651,500",
      currency: "UAH",
      note: "Exceeding this limit mandates transition to the General Tax System from the following quarter.",
    },
    employeesInfo:
      "No limit on the number of employees. Full labor law compliance required including contracts, timesheets, and tax withholdings.",
    allowedActivities: [
      "All service activities not prohibited by law",
      "Wholesale and retail trade",
      "Manufacturing and production",
      "Construction and installation works",
      "Transportation and logistics",
      "Hospitality and catering",
    ],
    popularKveds: [
      { code: "62.01", name: "Computer programming activities" },
      { code: "41.20", name: "Construction of residential and non-residential buildings" },
      { code: "46.90", name: "Non-specialised wholesale trade" },
      { code: "56.10", name: "Restaurants and mobile food service" },
      { code: "49.41", name: "Freight transport by road" },
    ],
    advantages: [
      "Highest income ceiling among unified tax groups",
      "Unlimited hiring capacity",
      "VAT registration enables work with large enterprises",
      "Input VAT credit reduces effective tax burden",
    ],
    risks: [
      "More complex accounting and VAT reporting",
      "Quarterly and monthly filing obligations increase",
      "Higher compliance costs (accountant recommended)",
      "Must transition to GTS if income limit exceeded",
    ],
    faq: [
      {
        question: "Is VAT registration mandatory in Group 3?",
        answer:
          "Yes. All Group 3 FOPs are VAT payers and must file monthly VAT declarations.",
      },
      {
        question: "Can I deduct business expenses?",
        answer:
          "Under unified tax, expenses are not deducted from taxable income. The 5% rate applies to gross revenue.",
      },
      {
        question: "When should I move to General Tax System?",
        answer:
          "When annual income exceeds ₴7,818,000, or when your business model benefits from expense deductions.",
      },
    ],
  },
  "group-general": {
    overview:
      "The General Tax System (GTS) applies when unified tax limits are exceeded or when the entrepreneur chooses full taxation. It involves income tax at 18%, VAT at 20%, and full expense accounting. Suitable for large businesses and those with significant deductible costs.",
    taxes: [
      {
        name: "Personal Income Tax",
        rate: "18%",
        description: "Tax on net profit (income minus documented expenses).",
        paymentDeadline: "Quarterly advance payments; annual declaration by May 1",
      },
      {
        name: "VAT",
        rate: "20%",
        description: "Standard VAT with input credit on business purchases.",
        paymentDeadline: "Monthly, by the 20th",
      },
      {
        name: "Military Tax",
        rate: "5%",
        description: "Applied to net entrepreneurial income.",
        paymentDeadline: "With quarterly income tax payments",
      },
      {
        name: "ESV",
        rate: "22% of income or minimum wage",
        description: "Social contribution based on declared income.",
        paymentDeadline: "Monthly, by the 19th",
      },
    ],
    incomeLimits: {
      annual: "No limit",
      monthly: "No limit",
      currency: "UAH",
      note: "No income ceiling, but full accounting and audit risk increase with revenue.",
    },
    employeesInfo:
      "Unlimited employees with full payroll tax obligations. Consider corporate restructuring (TOV) if the team exceeds 20+ people.",
    allowedActivities: [
      "All legal business activities",
      "Import and export operations",
      "Financial services (with licenses)",
      "Medical and pharmaceutical activities (with licenses)",
      "Large-scale manufacturing",
    ],
    popularKveds: [
      { code: "62.01", name: "Computer programming activities" },
      { code: "64.19", name: "Other monetary intermediation" },
      { code: "10.71", name: "Manufacture of bread and fresh pastry" },
      { code: "68.20", name: "Renting and operating of own or leased real estate" },
    ],
    advantages: [
      "No income ceiling",
      "Business expenses reduce taxable base",
      "Full VAT input credit",
      "Prestige with large corporate clients",
    ],
    risks: [
      "Complex accounting requirements",
      "Higher effective tax without significant expenses",
      "Increased audit scrutiny from tax authorities",
      "Requires professional accountant or ERP system",
    ],
    faq: [
      {
        question: "When am I forced to switch to GTS?",
        answer:
          "Automatically when you exceed your unified tax group's income limit and do not transition to a higher group in time.",
      },
      {
        question: "Can I switch back to unified tax?",
        answer:
          "Only at the start of a new calendar year, and only if you meet the income and activity requirements of the target group.",
      },
      {
        question: "Should I register a TOV instead?",
        answer:
          "Consider TOV when annual profit exceeds ₴3-5M, you have co-founders, or need limited liability protection.",
      },
    ],
  },
};

export const mockFopGroupDetails: FopGroupDetail[] = mockFopGroupSummaries.map(
  (summary) => ({
    ...summary,
    ...groupDetails[summary.id],
  })
);

export function getFopGroupBySlug(slug: string): FopGroupDetail | undefined {
  return mockFopGroupDetails.find((group) => group.slug === slug);
}
