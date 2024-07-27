interface IUser {
  avatar_id: number;
  content: string | null;
  created_at: string; // ISO date string
  description: string;
  email: string;
  email_verified_at: string | null;
  facebook: string | null;
  first_name: string;
  id: number;
  last_login: string; // ISO date string
  last_name: string;
  linkedin: string | null;
  manage_supers: number;
  permissions: string[];
  phone_number: string;
  position: string | null;
  super_user: number;
  updated_at: string; // ISO date string
  username: string;
}

class User implements IUser {
  avatar_id: number;
  content: string | null;
  created_at: string;
  description: string;
  email: string;
  email_verified_at: string | null;
  facebook: string | null;
  first_name: string;
  id: number;
  last_login: string;
  last_name: string;
  linkedin: string | null;
  manage_supers: number;
  permissions: string[];
  phone_number: string;
  position: string | null;
  super_user: number;
  updated_at: string;
  username: string;

  constructor(data: Partial<IUser> = {}) {
    this.avatar_id = data.avatar_id ?? 0;
    this.content = data.content ?? null;
    this.created_at = data.created_at ?? '';
    this.description = data.description ?? '';
    this.email = data.email ?? '';
    this.email_verified_at = data.email_verified_at ?? null;
    this.facebook = data.facebook ?? null;
    this.first_name = data.first_name ?? '';
    this.id = data.id ?? 0;
    this.last_login = data.last_login ?? '';
    this.last_name = data.last_name ?? '';
    this.linkedin = data.linkedin ?? null;
    this.manage_supers = data.manage_supers ?? 0;
    this.permissions = data.permissions ?? [];
    this.phone_number = data.phone_number ?? '';
    this.position = data.position ?? null;
    this.super_user = data.super_user ?? 0;
    this.updated_at = data.updated_at ?? '';
    this.username = data.username ?? '';
  }
}

export default User;
