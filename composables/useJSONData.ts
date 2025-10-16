import type {
  MainData,
  FAQ,
  Session,
  Speaker,
  Sponsor,
  TeamMember,
  NavbarItem,
  Partner,
  Job
} from '~/types'

import mainData from "../data/config.json";
import faqData from "../data/faq.json";
import scheduleData from "../data/schedule.json";
import sessionsData from "../data/sessions.json";
import speakersData from "../data/speakers.json";
import sponsorsData from "../data/sponsors.json";
import teamData from "../data/team.json";
import cocData from "../data/coc.json";
import navbarData from "../data/navbar.json";
import partnersData from "../data/partners.json";
import jobsData from "../data/jobs.json";

export const useJSONData = () => {
  return {
    mainData: mainData as MainData,
    faqData: faqData as FAQ[],
    scheduleData: scheduleData as any,
    sessionsData: sessionsData as Session[],
    speakersData: speakersData as Speaker[],
    sponsorsData: sponsorsData as Sponsor[],
    teamData: teamData as TeamMember[],
    cocData: cocData as any,
    navbarData: navbarData as NavbarItem[],
    partnersData: partnersData as Partner[],
    jobsData: jobsData as Job[]
  };
};
