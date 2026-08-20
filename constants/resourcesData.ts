export interface Course {
  code: string;
  link: string;
}

export interface Semester {
  name: string;
  pastQuestionsLink: string;
  courses?: Course[];
}

export interface others {
  name: string;
  link: string;
}

export interface Level {
  level: string;
  semesters: Semester[];
  others?: others[];
}

export const resourcesData: Level[] = [
  {
    level: "100 Level",
    semesters: [
      {
        name: "First Semester",
        pastQuestionsLink:
          "https://drive.google.com/drive/folders/1VbRZ0FfqYAMcPGV2dOvxujpUyGht31F8?usp=drive_link",
        courses: [
          {
            code: "BIO 101",
            link: "https://drive.google.com/drive/folders/1e2edqm3lTdI0zSpDExtrkc8ChSTzF0Gj",
          },
          {
            code: "CHM 101",
            link: "https://drive.google.com/drive/folders/1MOlSc0sVwjbHUFOK2xWSjiZoB8OltQOz?usp=drive_link",
          },
          {
            code: "CSC 101",
            link: "https://drive.google.com/drive/folders/1lRu48AnB6gbKX8CfI5sW9BnP-wAvmxkY?usp=drive_link",
          },
          {
            code: "GNS 111",
            link: "https://drive.google.com/drive/folders/1fk_2pFc4Rmi2oim7Z-d1p_q_1dIWtpNl?usp=drive_link",
          },
          {
            code: "MTS 101",
            link: "https://drive.google.com/drive/folders/1FPyZlpWOqqqp8Z5UQNAjucWqJxNhXaJX?usp=drive_link",
          },
          {
            code: "MTS 103",
            link: "https://drive.google.com/drive/folders/1CvjUO8fPbdny_oT_UCqt-Ud-EQKdHxbm?usp=drive_link",
          },
          {
            code: "PHS 101",
            link: "https://drive.google.com/drive/folders/14DWJmsowoTCGg3X7QngyVc1Xmc9Rbb_C?usp=drive_link",
          },
          {
            code: "STS 181",
            link: "https://drive.google.com/drive/folders/1TK4H0ndDX4WhfRkK6eBJuTpE70bqudOL?usp=drive_link",
          },
        ],
      },
      {
        name: "Second Semester",
        pastQuestionsLink:
          "https://drive.google.com/drive/folders/1eIFZ_Bpv8g-8-gHdPYrGBKbzgD9H6trJ?usp=drive_link ",
        courses: [
          {
            code: "AEM 102",
            link: "https://drive.google.com/drive/folders/12k8_YUT5O_w-qKdxSIipcHf9FfCotezf?usp=drive_link",
          },
          {
            code: "BIO 102",
            link: "https://drive.google.com/drive/folders/1l59mGUEdwoHLD0H5aiza63Bk4Wbc73Bo?usp=drive_link",
          },
          {
            code: "CHM 102",
            link: "https://drive.google.com/drive/folders/1Os6V2Z-eRSNQdstS74qeARoayu52Do22?usp=drive_link",
          },
          {
            code: "CSC 102",
            link: "https://drive.google.com/drive/folders/1Cwo0TFjAaZXc8AJE-oWCy5Cwitp8iZ_E?usp=drive_link",
          },
          {
            code: "GNS 101",
            link: "https://drive.google.com/drive/folders/1PHdJM4UFwuzPrgIHKtF-91T92oKimWnv?usp=drive_link",
          },
          {
            code: "GNS 102",
            link: "https://drive.google.com/drive/folders/1YGiKhNp9rGlUW0ta02fka6g-RdO00FIM?usp=drive_link",
          },
          {
            code: "MTS 102",
            link: "https://drive.google.com/drive/folders/1DdiOVGZnW39UMg-kujXXiiit5fIdaKpd?usp=drive_link",
          },
          {
            code: "MTS 104",
            link: "https://drive.google.com/drive/folders/1vqDn8oydWMHoWobVz0tskzMAr9qNoSWm?usp=drive_link",
          },
          {
            code: "PHS 102",
            link: "https://drive.google.com/drive/folders/1_yXcKwtMJP5K0xjlr-DycgX8q_ccuS1h?usp=drive_link",
          },
          {
            code: "STS 102",
            link: "https://drive.google.com/drive/folders/1d6MlCRVF9S015Yh1HbmsHLLmp9kruVBn?usp=drive_link",
          },
        ],
      },
    ],
    others: [
      {
        name: "Freshers Meal",
        link: "https://drive.google.com/file/d/10Ellc24A9NbK-gLPqOVozApgCqtly2OO/view?usp=drive_link",
      },
      {
        name: "Previous Year Questions 1st semester",
        link: "https://drive.google.com/file/d/1HshZFjgRlDgCDjdKe3LEJm4fJoqEkA5u/view?usp=drive_link",
      },
      {
        name: "Previous Year Questions 2nd semester",
        link: "https://drive.google.com/file/d/17w3SW6o2V6vFO8wOR2pQ3Uji_eD1WtY5/view?usp=drive_link",
      },
    ],
  },
  {
    level: "200 Level",
    semesters: [
      {
        name: "First Semester",
        pastQuestionsLink:
          "https://drive.google.com/drive/folders/1ro8z3sovIZh1hHnSoRMYJJzuvFTcYtwN?usp=drive_link",
        courses: [
          {
            code: "CSC 203",
            link: "https://drive.google.com/drive/folders/1dZUG1DTFbvU4qwPf9ninqSyDNsRh_4fx?usp=drive_link",
          },
          {
            code: "CSC 205",
            link: "https://drive.google.com/drive/folders/19QnG5rfF0UE96ibs7NyKPnu1K3ZK89Ae?usp=drive_link",
          },
          {
            code: "CSC 209",
            link: "https://drive.google.com/drive/folders/1-0XiEKCP3Dnn9FWUCflg5_JvRXC4YwQW?usp=drive_link",
          },
          {
            code: "CSC 217",
            link: "https://drive.google.com/drive/folders/15PH-DnxJqnVb4pv3HISvqEXH2QBq3Vs7?usp=drive_link",
          },
          {
            code: "CSC 225",
            link: "https://drive.google.com/drive/folders/1Fw-MTQFADJhrHzccX5zI7JgjpIFKEmu0?usp=drive_link",
          },
          {
            code: "CSC 271",
            link: "https://drive.google.com/drive/folders/1nhTIxvvrFcIlosG9OWGTAVF7dcx_eBWo?usp=drive_link",
          },
          {
            code: "MTS 213",
            link: "https://drive.google.com/drive/folders/1Rh5bb7VAxn02__MVEArHGWsxcfDVOQkS?usp=drive_link",
          },
          {
            code: "MTS 241",
            link: "https://drive.google.com/drive/folders/1iKipz1YlPfQpFOGQdrqwvtMSPWSFDAdi?usp=drive_link",
          },
        ],
      },
      {
        name: "Second Semester",
        pastQuestionsLink:
          "https://drive.google.com/drive/folders/10mXjEZUpSnpYYroCTJIjbbJpsoc648mL?usp=drive_link",
        courses: [
          {
            code: "CSC 204",
            link: "https://drive.google.com/drive/folders/1M6NXvErks7AVV23K1-q_PZAG2dvES_FL?usp=drive_link",
          },
          {
            code: "CSC 214",
            link: "https://drive.google.com/drive/folders/1aPlxVTJgXCF29ZiO1RCgAFGIchjBusNj?usp=drive_link",
          },
          {
            code: "CSC 218",
            link: "https://drive.google.com/drive/folders/1-r2fhu6Wkidrf5MvbHoHK1ym4A5fkei8?usp=drive_link",
          },
          {
            code: "CSC 246",
            link: "https://drive.google.com/drive/folders/1xLHN7dLziNijqSa03nV_cHnt_dg77rRB?usp=drive_link",
          },
          {
            code: "ETS 206",
            link: "https://drive.google.com/drive/folders/1ZgHrw7b1HHz8tT4KXTerryf6LhuAaeAb?usp=drive_link",
          },
          {
            code: "GNS 201",
            link: "https://drive.google.com/drive/folders/1L99GLlGKY-VMD-cG5bq-m1aQYUx-plN0?usp=drive_link",
          },
          {
            code: "GNS 202",
            link: "https://drive.google.com/drive/folders/1zOU3EARih6gwjs5pVdW1MQ56KPVMWKrp?usp=drive_link",
          },
          {
            code: "GNS 203",
            link: "https://drive.google.com/drive/folders/11xkXvikYlU8bIJA7gCAtxfSBZyYrrAbx?usp=drive_link",
          },
          {
            code: "GNS 204",
            link: "https://drive.google.com/drive/folders/1kQYQliK2B4KKO6M5wyNSYXeO45J8EN_1?usp=drive_link",
          },
          {
            code: "MTS 216",
            link: "https://drive.google.com/drive/folders/1PiLd6xCLCrdwDCZGzQjJTkHLCBZFqyhC?usp=drive_link",
          },
          {
            code: "PHS 242",
            link: "https://drive.google.com/drive/folders/11y9XulM8YN-UuZVLt-Bh5NZ7Omv2pGsM?usp=drive_link",
          },
        ],
      },
    ],
  },
  {
    level: "300 Level",
    semesters: [
      {
        name: "First Semester",
        pastQuestionsLink:
          "https://drive.google.com/drive/folders/1-8Ge6XM4y2IvGnpaUBPNHPJxs_sMAceu?usp=drive_link",
        courses: [
          {
            code: "CSC 301",
            link: "https://drive.google.com/drive/folders/1OcfgNRdpLidP3xJGoifejcis3lnoCYn0?usp=drive_link",
          },
          {
            code: "CSC 305",
            link: "https://drive.google.com/drive/folders/1e0f8P19fUG0It4eYk4PwEntZz_RQvlun?usp=drive_link",
          },
          {
            code: "CSC 307",
            link: "https://drive.google.com/drive/folders/1iS7grKE-O0j3dKwS-wnZYHe5uGUgE3cr?usp=drive_link",
          },
          {
            code: "CSC 311",
            link: "https://drive.google.com/drive/folders/1cqF93YaNUs5VCbw6XhOlKhwyfHdqFBw_?usp=drive_link",
          },
          {
            code: "CSC 319",
            link: "https://drive.google.com/drive/folders/1uVgTJkHM2dFizYGcOsPbu5XPzDkRzlTn?usp=drive_link",
          },
          {
            code: "CSC 337",
            link: "https://drive.google.com/drive/folders/1lSCd0SGU8NhPn0FWQ7c_RS1rQy57IBDF?usp=drive_link",
          },
          {
            code: "CSC 339",
            link: "https://drive.google.com/drive/folders/1InRgDGIklQVofe_7npFHrR_2pFwy7xrC?usp=drive_link",
          },
        ],
      },
    ],
  },
  {
    level: "400 Level",
    semesters: [
      {
        name: "First Semester",
        pastQuestionsLink:
          "https://drive.google.com/drive/folders/10FKNhFueoPPSKEJG4AEdn3K7QJKf29F2?usp=drive_link",
        courses: [
          {
            code: "CSC 403",
            link: "https://drive.google.com/drive/folders/107t_uNXaxs5ESJIfEETjlaiPM3lEEEEi?usp=drive_link",
          },
          {
            code: "CSC 405",
            link: "https://drive.google.com/drive/folders/12ljvwhAys87FRaCacrpFvVQBYAF0yX4N?usp=drive_link",
          },
          {
            code: "CSC 407",
            link: "https://drive.google.com/drive/folders/1ksNhmswXQV8iyTlpYSaYWqrCmQ0Sv0Yd?usp=drive_link",
          },
          {
            code: "CSC 431",
            link: "https://drive.google.com/drive/folders/1L4yS3_PzAUqrTbWdNvGm42p1Uwv5CJmO?usp=drive_link",
          },
          {
            code: "CSC 435 (Special topics in CSC)",
            link: "https://drive.google.com/drive/folders/1YLmX3XEfVbaI8uGit6XfFqoSHYdrofoB?usp=drive_link",
          },
          {
            code: "CSC 435 (Special topics in SE)",
            link: "https://drive.google.com/drive/folders/1gXFEFkuoBbdeW-L4HO0DB0yd5UWa7By9?usp=drive_link",
          },
          {
            code: "CSC 439",
            link: "https://drive.google.com/drive/folders/1q4oMkT_iy-m1FnhApFTKLcQBwsUm2LQi?usp=drive_link",
          },
          {
            code: "CSC 443",
            link: "https://drive.google.com/drive/folders/1teh8vnCt-iDpWUQA7dt9kBVVE2ugJvwb?usp=drive_link",
          },
          {
            code: "CSC 447",
            link: "https://drive.google.com/drive/folders/1UwqfVT5iLU_mCH-CAQ7Tp_APxL6qvVLq?usp=drive_link",
          },
        ],
      },
    ],
  },
];




export interface Textbook {
  name: string;
  link: string;
}

export const textbooks: Textbook[] = [
  {
    name: "Biology",
    link: "https://drive.google.com/drive/folders/1a59PE8gPVV_X52eoZWEJX5E1Clpnj2CX?usp=drive_link",
  },
  {
    name: "Chemistry",
    link: "https://drive.google.com/drive/folders/1kmxSvkhEXH0qiUxFKWFwk8uTf-4gNmqI?usp=drive_link",
  },
  {
    name: "Computer Science",
    link: "https://drive.google.com/drive/folders/1BC6sbPq49YIXwWMi8XCAgrKBjdv1AUpZ?usp=drive_link",
  },
  {
    name: "Economics",
    link: "https://drive.google.com/drive/folders/1oqsQ2LAaQ8NnE8C9RUrSGJvVOJSlNUl4?usp=drive_link",
  },
  {
    name: "General Studies",
    link: "https://drive.google.com/drive/folders/14XzB3rJ03pv61hW9U1SmXqNbissWJIuH?usp=drive_link",
  },
  {
    name: "Mathematics",
    link: "https://drive.google.com/drive/folders/1ozGk5XvtIicjQfz_5joZkQ7lAeAGa7P3?usp=drive_link",
  },
  {
    name: "Physics",
    link: "https://drive.google.com/drive/folders/1vxBcx6uQOhgH9mnpZHzc6gOIhI8jy_nA?usp=drive_link",
  },
  {
    name: "Statistics",
    link: "https://drive.google.com/drive/folders/1fPnWsH-V7fIwOaV05RsC-SEy7NPJtg1I?usp=drive_link",
  },
];
