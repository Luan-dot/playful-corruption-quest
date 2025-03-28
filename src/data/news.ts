
export interface NewsItem {
  id: number;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  relatedScenarioId?: number;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Major Construction Firm Executives Indicted in Bribery Scandal",
    source: "Global Integrity News",
    date: "2023-11-15",
    summary: "Executives from BuildCorp International face charges for allegedly bribing city officials to secure $500M in infrastructure contracts.",
    url: "#",
    relatedScenarioId: 1
  },
  {
    id: 2,
    title: "Safety Inspector Network Uncovered in Building Collapse Investigation",
    source: "Urban Development Monitor",
    date: "2023-09-28",
    summary: "Investigation into last year's apartment collapse reveals systematic corruption among safety inspectors who accepted payments to overlook violations.",
    url: "#",
    relatedScenarioId: 2
  },
  {
    id: 3,
    title: "Elite University Admissions Scandal Exposes Preferential Treatment",
    source: "Education Insight",
    date: "2023-12-05",
    summary: "Leaked documents show wealthy donors' children received special consideration despite failing to meet academic requirements.",
    url: "#",
    relatedScenarioId: 3
  },
  {
    id: 4,
    title: "Healthcare Provider Charged with Accepting Kickbacks from Suppliers",
    source: "Medical Ethics Journal",
    date: "2024-01-18",
    summary: "Regional hospital administrator faces criminal charges for steering $12M in contracts to medical suppliers in exchange for personal benefits.",
    url: "#",
    relatedScenarioId: 4
  },
  {
    id: 5,
    title: "Environmental Data Falsification Leads to Toxic Spill Cover-Up",
    source: "EcoWatch",
    date: "2024-02-02",
    summary: "Manufacturing plant executives deliberately altered safety reports, resulting in contamination affecting downstream communities.",
    url: "#",
    relatedScenarioId: 5
  }
];
