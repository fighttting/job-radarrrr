export default async function getApplications() {
  const response = await fetch("/applications.json");

  if (!response.ok) {
    throw new Error(`Failed to load applications: ${response.status}`);
  }

  return response.json();
}
