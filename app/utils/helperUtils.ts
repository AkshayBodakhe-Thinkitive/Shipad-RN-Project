export function firstLetterCapitalize(String : string | undefined) {
    if(!String) return '';
    return String.charAt(0).toUpperCase() + String.slice(1)?.toLowerCase();
}

import moment from 'moment';

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';

  return moment(dateString).format('DD/MM/YYYY');
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return '';

  return moment(dateString).format('DD/MM/YYYY hh:mm A');
}