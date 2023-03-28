export interface ContentDataType {
  thumbnailSrc: string;
  video_id: string;
  title: string;
  video_group: string;
  upload_date: string;
  isPublic: boolean;
  sells: number;
  views: number;
  likes: number;
  genre: number;
  tag: number;
}
export interface GroupDataType {
  thumbnail: string;
  video_group_id: string;
  title: string;
  upload_date: string;
  isPublic: boolean;
  sells: number;
  views: number;
  likes: number;
  genre: number;
  tag: number;
}

export interface GenreType {
  genre_id: number;
  genre: string;
}

export interface TagType {
  tag_id: number;
  tag: string;
}

export interface UserDataType {
  user_id: number;
  user_name: string;
  email: string;
  google_id: string;
  twitch_id: string;
}

export interface CardDataType {
  src: string;
  url: string;
}

export interface GoogleLoginType {
  user_name: string;
  email: string;
  google_id: string;
}

export interface TwitchLoginType {
  email: string;
  twitch_id: string;
}

export const Provider = {
  google: "google",
  twitch: "twitch",
} as const;

export type ProviderType = typeof Provider[keyof typeof Provider];
