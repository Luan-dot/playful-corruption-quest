
import { Scenario } from './scenarios';

export interface CommunityScenario extends Omit<Scenario, 'id'> {
  id: string;
  submittedBy: string;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  upvotes: number;
}

export const communityScenarios: CommunityScenario[] = [
  {
    id: "comm-1",
    submittedBy: "EthicsProf_22",
    dateSubmitted: "2024-01-15",
    status: "approved",
    upvotes: 47,
    title: "The University Research Grant",
    description: "As a university research department head, you discover that a colleague has been manipulating research data to maintain corporate funding for their project. The research impacts public health recommendations.",
    setting: {
      position: "Research Department Chair",
      year: "Present Day",
      context: "The university depends heavily on corporate partnerships for funding major research initiatives.",
      location: "Major Research University"
    },
    context: "Research integrity is fundamental to scientific progress and public trust. When research is compromised by financial interests, it undermines the credibility of academic institutions and can lead to harmful public policy.",
    lesson: "Conflicts of interest in research require strong governance and transparency. Without proper oversight, financial pressures can compromise scientific integrity.",
    realWorldExample: "In 2009, it was revealed that pharmaceutical company Merck had created a fake academic journal called 'The Australasian Journal of Bone and Joint Medicine' to publish studies favorable to their products without disclosing their sponsorship.",
    hint: "Consider both the immediate ethical implications and the long-term consequences for scientific integrity and public health.",
    keyConcepts: [
      "Research Integrity",
      "Conflict of Interest",
      "Institutional Responsibility",
      "Scientific Ethics"
    ],
    globalImpact: "Corrupted research leads to misallocated resources, inappropriate treatments, and undermined public trust in science, affecting millions worldwide.",
    stakeholders: [
      "Students",
      "Other Researchers",
      "Public Health Officials",
      "General Public"
    ],
    choices: [
      {
        id: 1,
        text: "Confront your colleague privately and demand they correct the data before you're forced to report it.",
        reasoning: "This gives them a chance to correct their mistake while maintaining their dignity and reputation.",
        outcomeText: "Your colleague initially denies the manipulation but eventually agrees to reanalyze the data properly. The corrected findings show less promising results, and some funding is lost, but academic integrity is preserved.",
        outcomes: {
          integrity: 15,
          money: -10,
          power: 0,
          reputation: 10
        }
      },
      {
        id: 2,
        text: "Report the issue to the university ethics committee following proper protocols.",
        reasoning: "This follows institutional procedures and ensures proper investigation without making premature accusations.",
        outcomeText: "The investigation confirms the data manipulation. Your colleague faces disciplinary action, but you receive pushback from others who feel you should have addressed it internally first.",
        outcomes: {
          integrity: 20,
          money: -15,
          power: -5,
          reputation: 5
        }
      },
      {
        id: 3,
        text: "Quietly suggest improvements to the research methodology without directly addressing the manipulation.",
        reasoning: "This avoids conflict while still working toward more accurate research outcomes.",
        outcomeText: "Your suggestions are implemented, slightly improving the data quality, but the underlying manipulation continues. The flawed research influences health guidelines, potentially affecting thousands of people.",
        outcomes: {
          integrity: -10,
          money: 10,
          power: 5,
          reputation: -5
        }
      }
    ]
  },
  {
    id: "comm-2",
    submittedBy: "GlobalWatchdog",
    dateSubmitted: "2024-02-03",
    status: "approved",
    upvotes: 32,
    title: "The Border Official's Dilemma",
    description: "As a border control officer in a developing nation, you're offered a bribe to allow agricultural imports without proper inspection. The importers claim the food is urgently needed for an upcoming festival.",
    setting: {
      position: "Border Control Official",
      year: "Present Day",
      context: "Your country has strict agricultural import rules due to previous pest outbreaks that devastated local farmers.",
      location: "Rural Border Checkpoint"
    },
    context: "Border corruption is a global issue that undermines security, public health, and economic regulations. Bribery at borders facilitates illegal trafficking, tax evasion, and circumvention of safety standards.",
    lesson: "Even seemingly minor corruption at borders can have far-reaching consequences for public health, local economies, and rule of law.",
    realWorldExample: "In 2019, an investigation in Eastern Europe revealed systematic bribery of border officials, allowing uninspected agricultural products to enter the EU, leading to a regional outbreak of crop disease.",
    hint: "Consider the potential consequences of uninspected agricultural imports and the precedent set by accepting bribes.",
    keyConcepts: [
      "Border Integrity",
      "Food Safety",
      "Customs Enforcement",
      "Systemic Corruption"
    ],
    globalImpact: "Border corruption costs developing economies billions annually through lost tariff revenue and undermines regulatory systems designed to protect public safety.",
    stakeholders: [
      "Local Farmers",
      "Consumers",
      "Import Companies",
      "Government Regulators"
    ],
    choices: [
      {
        id: 1,
        text: "Refuse the bribe and insist on proper inspection procedures, explaining the risks involved.",
        reasoning: "This upholds the law and protects agricultural biosecurity, though it may delay culturally important goods.",
        outcomeText: "The importers are frustrated but comply with expedited inspection. A pest is actually found in one shipment, which would have threatened local crops. Your supervisor commends your integrity.",
        outcomes: {
          integrity: 20,
          money: -5,
          power: 5,
          reputation: 15
        }
      },
      {
        id: 2,
        text: "Accept the bribe but perform a quick visual inspection anyway to catch obvious problems.",
        reasoning: "This compromises with some inspection while still allowing timely delivery for the festival.",
        outcomeText: "The goods pass through faster, but six months later, an invasive insect species is discovered that was traced back to these imports. An investigation begins into border procedures.",
        outcomes: {
          integrity: -15,
          money: 15,
          power: 0,
          reputation: -10
        }
      },
      {
        id: 3,
        text: "Suggest an official 'expedited processing fee' through proper channels instead.",
        reasoning: "This redirects the request through legitimate fast-track procedures rather than personal bribery.",
        outcomeText: "The importers pay the official expedited fee. Inspection proceeds quickly but thoroughly, balancing cultural needs with safety protocols. This becomes a model for similar situations.",
        outcomes: {
          integrity: 10,
          money: 5,
          power: 10,
          reputation: 10
        }
      }
    ]
  }
],
