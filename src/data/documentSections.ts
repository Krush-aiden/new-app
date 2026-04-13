export interface SubSection {
  id: string;
  number: string;
  title: string;
  content: string;
}

export interface DocumentSection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  subsections: SubSection[];
}

/** Helper: compute indent depth from a subsection number (e.g. "7.7.6.3.1" → 4) */
export function getDepth(number: string): number {
  return number.split(".").length - 1;
}

export const documentSections: DocumentSection[] = [
  {
    id: "section-4",
    number: "4",
    title: "Equipment",
    subtitle: "Molding Equipment",
    subsections: [
      {
        id: "4.1",
        number: "4.1",
        title: "Mold Frame #: 5910870010",
        content: "",
      },
      {
        id: "4.2",
        number: "4.2",
        title: "",
        content:
          "Van Dorn 35 Ton Injection Molding Machine, Model# ERGOtech 35-120 Compact, Serial# 7121-0084: Machine #86 with 0.8oz barrel and 18mm screw and general purpose shut off nozzle. Calibration due date: To be reported in OQ report",
      },
      {
        id: "4.3",
        number: "4.3",
        title: "Mold Water Heating Units",
        content: "",
      },
      {
        id: "4.3.1",
        number: "4.3.1",
        title: "",
        content:
          "Mokon MM7304-UM Serial #: 62162, Calibration due date: To be reported in OQ report",
      },
      {
        id: "4.3.2",
        number: "4.3.2",
        title: "",
        content:
          "Mokon MM7304-UM Serial #: 62163, Calibration due date: To be reported in OQ report",
      },
      {
        id: "4.4",
        number: "4.4",
        title: "Inspection Equipment",
        content: "",
      },
      {
        id: "4.4.1",
        number: "4.4.1",
        title: "",
        content:
          "All inspection equipment used for the OQ inspections will be in calibration and the specific equipment and calibration date will be reported in the OQ report.",
      },
    ],
  },
  {
    id: "section-5",
    number: "5",
    title: "Materials",
    subsections: [
      {
        id: "5.1",
        number: "5.1",
        title: "",
        content:
          "Sabic DF008ERH 7H7D527. Lot number: To be documented in the OQ report.",
      },
    ],
  },
  {
    id: "section-7",
    number: "7",
    title: "Procedures and Testing",
    subsections: [
      {
        id: "7.7",
        number: "7.7",
        title: "Proceed with SIM process Development",
        content: "",
      },
      {
        id: "7.7.1",
        number: "7.7.1",
        title: "Develop Viscosity Characterization",
        content: "",
      },
      {
        id: "7.7.2",
        number: "7.7.2",
        title: "Pressure loss study",
        content: "",
      },
      {
        id: "7.7.3",
        number: "7.7.3",
        title: "Document Balance of Fill",
        content: "",
      },
      {
        id: "7.7.4",
        number: "7.7.4",
        title: "Perform Gate Freeze Study",
        content: "",
      },
      {
        id: "7.7.5",
        number: "7.7.5",
        title: "Perform Delta P study on machine",
        content: "",
      },
      {
        id: "7.7.6",
        number: "7.7.6",
        title: "Proceed to Hi-Low Challenge",
        content: "",
      },
      {
        id: "7.7.6.1",
        number: "7.7.6.1",
        title: "Set process parameters to Nominal process using the information above",
        content: "",
      },
      {
        id: "7.7.6.2",
        number: "7.7.6.2",
        title: "Allow process to reach thermal equilibrium using mold temperature and the viscosity of the material.",
        content: "",
      },
      {
        id: "7.7.6.3",
        number: "7.7.6.3",
        title: "Run required number of shots per customer / supplier standards",
        content: "",
      },
      {
        id: "7.7.6.3.1",
        number: "7.7.6.3.1",
        title: "Metrology samples are pulled consecutively, once step 7.7.6.2 has been achieved. Metrology shots are individually bagged, and numbered as they are collected along with the process setting.",
        content: "",
      },
    ],
  },
  {
    id: "section-8",
    number: "8",
    title: "Acceptance Criteria",
    subsections: [
      {
        id: "8.1",
        number: "8.1",
        title: "Visual Inspection Criteria",
        content:
          "All parts must be free from flash, short shots, burn marks, splay, and other cosmetic defects as defined in the quality specification.",
      },
      {
        id: "8.2",
        number: "8.2",
        title: "Dimensional Criteria",
        content:
          "All critical dimensions must be within the specified tolerances as defined in the engineering drawing.",
      },
      {
        id: "8.3",
        number: "8.3",
        title: "Functional Testing",
        content:
          "Parts must pass all functional tests including assembly fit checks and capsule fill verification.",
      },
    ],
  },
];
