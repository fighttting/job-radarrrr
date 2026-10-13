import { load } from "../storage";

export default async function getApplications() {
  return load().applications;
}
