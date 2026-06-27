export interface ApplicationInput {
  name: string;
  email: string;
  platform: string;
  profileLink: string;
  audienceSize: string;
  note?: string;
}

export type ApplicationErrors = Partial<Record<keyof ApplicationInput, string>>;

export interface ValidationResult {
  valid: boolean;
  errors: ApplicationErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(input: Partial<ApplicationInput>): ValidationResult {
  const errors: ApplicationErrors = {};

  if (!input.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!input.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.platform?.trim()) {
    errors.platform = "Platform is required.";
  }

  if (!input.profileLink?.trim()) {
    errors.profileLink = "Profile link is required.";
  }

  if (!input.audienceSize?.trim()) {
    errors.audienceSize = "Audience size is required.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
