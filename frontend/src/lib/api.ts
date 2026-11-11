import { ReportFilters, ReportRow } from '../types/report';

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return (
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://backend:4000/api'
    );
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
}

export async function fetchReport(
  filters?: Partial<ReportFilters>,
): Promise<ReportRow[]> {
  const baseUrl = getApiBaseUrl();
  const params = new URLSearchParams();

  if (filters?.search && filters.search.trim()) {
    params.set('search', filters.search.trim());
  }
  if (filters?.department && filters.department.trim()) {
    params.set('department', filters.department.trim());
  }
  if (filters?.status && filters.status.trim()) {
    params.set('status', filters.status.trim());
  }

  const queryString = params.toString();
  const url = `${baseUrl}/report${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch report: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<ReportRow[]>;
}

export async function fetchDepartments(): Promise<string[]> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/departments`;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch departments: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<string[]>;
}
