import { ProfileData } from '../types/contact';

export function generateVCardString(profile: ProfileData): string {
  const names = profile.fullName.trim().split(' ');
  const lastName = names.length > 1 ? names[names.length - 1] : '';
  const firstName = names.length > 1 ? names.slice(0, -1).join(' ') : names[0] || '';

  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.fullName}`,
    `N:${lastName};${firstName};;;`,
    `TITLE:${profile.professionalTitle}`,
    `EMAIL;TYPE=INTERNET,PREF:${profile.email}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `ADR;TYPE=WORK:;;;${profile.location};;;`,
    `URL:${profile.links.portfolio || window.location.origin}`,
    `NOTE:${profile.tagline || profile.bio}`,
    `X-SOCIALPROFILE;type=linkedin:${profile.links.linkedin}`,
    `X-SOCIALPROFILE;type=instagram:${profile.links.instagram}`,
    'END:VCARD',
  ];

  return vcardLines.join('\r\n');
}

export function downloadVCard(profile: ProfileData): void {
  const vcardContent = generateVCardString(profile);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sanitizedName = profile.fullName.toLowerCase().replace(/\s+/g, '_');
  link.href = url;
  link.setAttribute('download', `${sanitizedName}_contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
