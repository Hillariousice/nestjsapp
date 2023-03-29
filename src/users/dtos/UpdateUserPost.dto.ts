export class UpdateUserPostDto {
    username?: string;
    title?: string;
    description?: string;
    image?: string;
    likes?: Record<string, boolean>;
    comments?: string;
  }