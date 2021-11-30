// 文件列表项
export type FileListItem = {
  id: string;
  title: string;
  body?: string;
  createdAt: string;

  isNew?: boolean;
  isLoad?: boolean;
};
