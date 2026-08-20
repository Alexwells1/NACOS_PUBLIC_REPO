import { LucideIcon } from "lucide-react";

export interface Level {
  key: "L100" | "L200" | "L200F" | "L300" | "L400";
  name: string;
  value: string;
}

export interface Program {
  key: "CYSDSC" | "ICTIFT" | "SWIS" | "CSC";

  name: string;
  description: string;
}
export interface Payment {
  _id: string;
  fullName: string;
  matricNumber: string;
  email: string;
  level: Level["key"];
  department: Program["key"];
  type: "college" | "departmental";
  amount: number;
  createdAt: string;
  phoneNumber: string;
}




export interface formdata {
  fullName: string;
  lastName: string;
  firstName: string;
  matricNumber: string;
  email: string;
  department: string;
  level: string;
  type: string;
  phoneNumber: string;
}


export interface PaymentData {
  fullName: string;
  matricNumber: string;
  email: string;
  department: string;
  level: string;
  type: string;
  amount: number;
  reference?: string;
  phoneNumber: string;
}


export interface Department {
  name: string;
  description: string;
  icon: LucideIcon; 
  color: string;
  image: string;
}

export interface TabContent {
  title: string;
  content: string;
}




export type DepartmentKey = "computer" | "cyber" | "ict" | "software";

export type Departments = Record<DepartmentKey, Department>;

export interface TabContent {
  title: string;
  content: string;
}

export type TabKey = "story" | "vision" | "mission";

export type TabContents = Record<TabKey, TabContent>;