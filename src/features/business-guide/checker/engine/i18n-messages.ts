import { AppLanguage } from "@/src/shared/i18n/types";
import { FopGroupSlug } from "../../types";

export const GROUP_NAMES: Record<AppLanguage, Record<FopGroupSlug, string>> = {
  en: {
    "1": "FOP Group 1",
    "2": "FOP Group 2",
    "3": "FOP Group 3",
    general: "General Tax System",
  },
  uk: {
    "1": "Група ФОП 1",
    "2": "Група ФОП 2",
    "3": "Група ФОП 3",
    general: "Загальна система оподаткування",
  },
};

interface EngineMessages {
  incomeWithinLimit: (income: string, percent: number, group: string) => string;
  incomeExceedsLimits: (group: string) => string;
  noEmployees: string;
  hiringExceedsG2: string;
  teamFits: (range: string, group: string) => string;
  b2bBenefit: string;
  b2cBenefit: string;
  activityFits: (activity: string) => string;
  aiExplanation: (
    group: string,
    income: string,
    activity: string,
    employeeText: string,
    businessText: string,
    firstReason: string
  ) => string;
  employeeTexts: Record<string, string>;
  businessTexts: Record<string, string>;
  taxNotes: {
    general: string;
    group1: string;
    group2b2b: string;
    group2b2c: string;
    group3: string;
  };
  employeesCompat: {
    g3: string;
    general: string;
    g1yes: string;
    g1no: string;
    g2yes: (max: number) => string;
    g2no: string;
  };
  risks: {
    incomeHigh: (percent: number, group: string) => string;
    g1employees: string;
    b2bLarge: string;
    g3vat: string;
    generalAccounting: string;
  };
  growth: {
    g1: string;
    g2income: string;
    g2employees: string;
    g2default: string;
    g3: string;
    general: string;
    default: string;
  };
  alternative: (score: number) => string;
  exportTitle: string;
  exportLabels: Record<string, string>;
}

const en: EngineMessages = {
  incomeWithinLimit: (income, percent, group) =>
    `Your expected income of ${income} uses ${percent}% of the ${group} annual limit.`,
  incomeExceedsLimits: (group) =>
    `Your expected income exceeds all unified tax group limits, making ${group} the compliant choice.`,
  noEmployees: "With no employees, you qualify for simplified solo-entrepreneur reporting.",
  hiringExceedsG2: "Your hiring plans exceed Group 2's 10-employee cap, requiring a higher group.",
  teamFits: (range, group) =>
    `Your team size (${range} employees) fits within ${group} hiring rules.`,
  b2bBenefit: "B2B operations benefit from VAT invoicing capabilities in this group.",
  b2cBenefit: "B2C focus allows the lowest applicable unified tax rate.",
  activityFits: (activity) =>
    `${activity} businesses commonly operate successfully under this group.`,
  aiExplanation: (group, income, activity, employeeText, businessText, firstReason) =>
    `Based on your business profile, ${group} is recommended because your expected income of ${income}, ${activity} activity, ${employeeText}, and ${businessText} fit within the group's limits and provide the most practical reporting requirements. ${firstReason}`,
  employeeTexts: {
    none: "no hiring plans",
    "1-5": "plans to hire 1–5 employees",
    "5-10": "plans to hire 5–10 employees",
    "10+": "plans to hire more than 10 employees",
  },
  businessTexts: {
    b2b: "B2B clients",
    b2c: "B2C clients",
    both: "mixed B2B and B2C clients",
  },
  taxNotes: {
    general: "Estimated on ~35% net margin. Actual depends on documented expenses.",
    group1: "Unified tax at 2% (services). ESV at minimum contribution.",
    group2b2b: "Unified tax at 5% (B2B with VAT option).",
    group2b2c: "Unified tax at 3% (B2C rate).",
    group3: "Includes 5% unified tax and estimated net VAT liability.",
  },
  employeesCompat: {
    g3: "Unlimited employees allowed under Group 3.",
    general: "General Tax System supports unlimited hiring.",
    g1yes: "Compatible — Group 1 is designed for solo operators.",
    g1no: "Not compatible — Group 1 prohibits hiring employees.",
    g2yes: (max) => `Compatible — up to ${max} employees fits within Group 2's 10-person limit.`,
    g2no: "Not compatible — Group 2 allows maximum 10 employees.",
  },
  risks: {
    incomeHigh: (percent, group) =>
      `Income is at ${percent}% of the ${group} limit — plan a transition before year-end.`,
    g1employees: "Group 1 does not allow employees — you must switch groups before hiring.",
    b2bLarge:
      "Large B2B contracts may require VAT invoices — verify 5% unified tax rate with your accountant.",
    g3vat: "Monthly VAT reporting adds compliance overhead — consider hiring an accountant.",
    generalAccounting:
      "Full accounting and expense documentation required — higher administrative burden.",
  },
  growth: {
    g1: "Monitor income monthly. If you approach ₴1.67M, prepare to transition to Group 2 at the next quarter.",
    g2income:
      "You're approaching the Group 2 ceiling. Evaluate Group 3 before Q4 to avoid forced transition.",
    g2employees:
      "Near the 10-employee cap. If you plan to scale the team, model costs under Group 3 now.",
    g2default:
      "Group 2 offers strong growth headroom. Reinvest in marketing while staying under the ₴5.33M limit.",
    g3: "Approaching the unified tax ceiling. Consult an accountant about General Tax System or TOV registration.",
    general:
      "Consider TOV (LLC) registration if you have co-founders or need limited liability protection.",
    default: "Review your group eligibility annually and after any major business changes.",
  },
  alternative: (score) =>
    `Alternative if your income grows slower than projected — scored ${score} points.`,
  exportTitle: "FOP Eligibility Checker — Flowiq",
  exportLabels: {
    activity: "Activity",
    income: "Expected Income",
    employees: "Employees",
    businessType: "Business Type",
    recommended: "Recommended",
    confidence: "Confidence",
    why: "Why",
    aiInsight: "AI Insight",
    taxes: "Estimated Taxes",
    growth: "Growth",
  },
};

const uk: EngineMessages = {
  incomeWithinLimit: (income, percent, group) =>
    `Ваш очікуваний дохід ${income} становить ${percent}% річного ліміту ${group}.`,
  incomeExceedsLimits: (group) =>
    `Ваш очікуваний дохід перевищує ліміти всіх груп єдиного податку, тому ${group} — відповідний вибір.`,
  noEmployees: "Без працівників ви маєте право на спрощену звітність для індивідуального підприємця.",
  hiringExceedsG2:
    "Ваші плани найму перевищують ліміт Групи 2 у 10 працівників — потрібна вища група.",
  teamFits: (range, group) =>
    `Розмір команди (${range} працівників) відповідає правилам найму в ${group}.`,
  b2bBenefit: "B2B-діяльність виграє від можливості виписки рахунків з ПДВ у цій групі.",
  b2cBenefit: "Фокус на B2C дозволяє застосувати найнижчу ставку єдиного податку.",
  activityFits: (activity) =>
    `Бізнес у сфері «${activity}» зазвичай успішно працює в цій групі.`,
  aiExplanation: (group, income, activity, employeeText, businessText, firstReason) =>
    `На основі вашого профілю рекомендовано ${group}, оскільки очікуваний дохід ${income}, діяльність «${activity}», ${employeeText} та ${businessText} відповідають лімітам групи та забезпечують найзручнішу звітність. ${firstReason}`,
  employeeTexts: {
    none: "без планів найму",
    "1-5": "плани найняти 1–5 працівників",
    "5-10": "плани найняти 5–10 працівників",
    "10+": "плани найняти понад 10 працівників",
  },
  businessTexts: {
    b2b: "клієнти B2B",
    b2c: "клієнти B2C",
    both: "змішані клієнти B2B та B2C",
  },
  taxNotes: {
    general: "Оцінка при ~35% чистої маржі. Фактична сума залежить від документованих витрат.",
    group1: "Єдиний податок 2% (послуги). ЄСВ за мінімальним внеском.",
    group2b2b: "Єдиний податок 5% (B2B з опцією ПДВ).",
    group2b2c: "Єдиний податок 3% (ставка B2C).",
    group3: "Включає 5% єдиного податку та орієнтовне чисте зобов'язання з ПДВ.",
  },
  employeesCompat: {
    g3: "У Групі 3 дозволено необмежену кількість працівників.",
    general: "Загальна система підтримує необмежений найм.",
    g1yes: "Сумісно — Група 1 призначена для індивідуальної роботи.",
    g1no: "Не сумісно — Група 1 забороняє найм працівників.",
    g2yes: (max) => `Сумісно — до ${max} працівників відповідає ліміту Групи 2 (10 осіб).`,
    g2no: "Не сумісно — Група 2 дозволяє максимум 10 працівників.",
  },
  risks: {
    incomeHigh: (percent, group) =>
      `Дохід становить ${percent}% ліміту ${group} — плануйте перехід до кінця року.`,
    g1employees: "Група 1 не дозволяє працівників — змініть групу перед наймом.",
    b2bLarge:
      "Великі B2B-контракти можуть вимагати рахунків з ПДВ — уточніть ставку 5% з бухгалтером.",
    g3vat: "Щомісячна звітність з ПДВ збільшує навантаження — розгляньте бухгалтера.",
    generalAccounting:
      "Потрібен повний облік і документування витрат — вище адміністративне навантаження.",
  },
  growth: {
    g1: "Відстежуйте дохід щомісяця. При наближенні до ₴1,67 млн готуйте перехід на Групу 2 з наступного кварталу.",
    g2income:
      "Ви наближаєтесь до стелі Групи 2. Оцініть Групу 3 до IV кварталу, щоб уникнути примусового переходу.",
    g2employees:
      "Близько до ліміту 10 працівників. Якщо плануєте масштабування команди, моделюйте витрати в Групі 3.",
    g2default:
      "Група 2 дає простір для зростання. Інвестуйте в маркетинг, залишаючись нижче ₴5,33 млн.",
    g3: "Наближення до стелі єдиного податку. Порадьтеся з бухгалтером щодо загальної системи або ТОВ.",
    general:
      "Розгляньте реєстрацію ТОВ, якщо є співзасновники або потрібен захист відповідальності.",
    default: "Переглядайте відповідність групі щороку та після суттєвих змін у бізнесі.",
  },
  alternative: (score) =>
    `Альтернатива, якщо дохід зростатиме повільніше — ${score} балів.`,
  exportTitle: "FOP Eligibility Checker — Flowiq",
  exportLabels: {
    activity: "Діяльність",
    income: "Очікуваний дохід",
    employees: "Працівники",
    businessType: "Тип бізнесу",
    recommended: "Рекомендовано",
    confidence: "Впевненість",
    why: "Чому",
    aiInsight: "AI-інсайт",
    taxes: "Орієнтовні податки",
    growth: "Зростання",
  },
};

export function getEngineMessages(language: AppLanguage): EngineMessages {
  return language === "uk" ? uk : en;
}

export function getGroupName(language: AppLanguage, slug: FopGroupSlug): string {
  return GROUP_NAMES[language][slug];
}
