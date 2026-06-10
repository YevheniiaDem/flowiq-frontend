import { TaxType } from "../types";

export const mockTaxes: TaxType[] = [
  {
    id: "unified-tax",
    name: "Unified Tax",
    description:
      "A simplified single tax for FOPs that replaces income tax, VAT (for most activities), and property tax. The rate depends on your FOP group and chosen percentage.",
    paymentDeadlines: [
      "Quarterly — by the 20th of the month following the quarter",
      "Annual declaration — by March 1 of the following year",
    ],
    formula: "Unified Tax = Taxable Income × Tax Rate (1%, 3%, or 5%)",
    recommendations: [
      "Track income monthly to avoid exceeding your group limit",
      "Choose 3% or 5% rate at registration — switching mid-year is restricted",
      "Keep separate records for each income source",
    ],
  },
  {
    id: "military-tax",
    name: "Military Tax",
    description:
      "A temporary levy of 5% on income for individuals, including FOPs on the general tax system and certain other cases. FOPs on unified tax generally do not pay military tax on business income.",
    paymentDeadlines: [
      "With each income payment — withheld at source",
      "Self-declaration — monthly by the 20th",
    ],
    formula: "Military Tax = Taxable Income × 5%",
    recommendations: [
      "Verify whether your FOP group is exempt from military tax on business income",
      "Include military tax in payroll calculations if you have employees",
      "Monitor legislative updates — rates and exemptions may change",
    ],
  },
  {
    id: "esv",
    name: "ESV",
    description:
      "Unified Social Contribution (ЄСВ) is a mandatory monthly payment that provides pension and social insurance coverage. The minimum amount is set annually by the government.",
    paymentDeadlines: [
      "Monthly — by the 19th of the following month",
      "Annual reconciliation — by February 15",
    ],
    formula: "ESV = Minimum Wage × 22% (minimum contribution) or Income × 22% (if higher)",
    recommendations: [
      "Pay ESV even during months with zero income to maintain insurance record",
      "Set up automatic bank payments to avoid penalties",
      "Check the current minimum ESV amount at the start of each year",
    ],
  },
];
