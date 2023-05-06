export interface ImageUploadResponse {
  fileNameOnStoarge: string;
  message: string;
  imageLocation: string;
  success: boolean;
}

export interface ImageConfirmType {
  images: string[];
  contentId: number;
  author: string;
}
