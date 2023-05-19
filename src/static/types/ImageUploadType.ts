export interface ImageUploadResponse {
  fileNameOnStoarge: string;
  message: string;
  imageLocation: string;
  success: boolean;
}

export interface ImageConfirm {
  images: string[];
  contentId: number;
  author: string;
}
