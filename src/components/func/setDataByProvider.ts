import { GoogleLoginType, TwitchLoginType } from "@src/static/types/dataTypes";

export const setGoogle = (
  email: string,
  googleID: string,
  username: string
): GoogleLoginType => {
  const data: GoogleLoginType = {
    user_name: username,
    email: email,
    google_id: googleID,
  };
  return data;
};

export const setTwitch = (email: string, twitchID: string): TwitchLoginType => {
  const data: TwitchLoginType = {
    email: email,
    twitch_id: twitchID,
  };
  return data;
};
